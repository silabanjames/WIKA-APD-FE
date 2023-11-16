<template>
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header d-flex flex-column align-items-start w-auto pb-1">
          <h5 class="modal-title fw-bold">GALLERY</h5>
          <div class="w-100 d-flex justify-content-between">
            <div class="small text-secondary">CCTV View & Image Tagging</div>
            <div class="small text-secondary">dd/mm/yyyy 08:00:00 - CCTV 1</div>
          </div>
        </div>

        <div class="modal-body row">
          <div class="col-lg-9 d-flex">

            <div class="bg-secondary" id="canvas-container" style="width: 100%;">
              <canvas class="position-absolute border border-5" id="canvas" style="width: 100%;" ></canvas>
            </div>
          
          </div>
          <div class="col-lg-3 d-flex flex-column">

            <div class="colorPicker d-flex justify-content-center pb-2 pt-lg-0 pt-2" id="colorPicker" style="width: 100%;"></div>

            <!-- Tag -->
            <div class="tag my-1">
              <div class="tag-header p-1">
                Tag
              </div>
              <div class="p-1">
                <div class="d-flex justify-content-between bg-success p-2 rounded-2 my-1 ">
                  <span class="fw-semibold text-black">Productive</span>
                  <span class="bg-white px-2 rounded-pill text-black">7</span>
                </div>
                <div class="d-flex justify-content-between bg-warning p-2 rounded-2 my-1 ">
                  <span class="fw-semibold text-black">Semi Productive</span>
                  <span  class="bg-white px-2 rounded-pill text-black">7</span>
                </div>
                <div class="d-flex justify-content-between bg-danger p-2 rounded-2 my-1 ">
                  <span class="fw-semibold text-white">Non Productive</span>
                  <span  class="bg-white px-2 rounded-pill text-black">7</span>
                </div>
              </div>
            </div>

            <!-- Modal Button -->
              <div class="d-flex flex-wrap justify-content-between mt-auto">
                <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Close</button>
                <button class="btn btn-primary" type="button">Save changes</button>
              </div>
          </div>
        </div>

      </div>
    </div>
</template>

<style scoped>
.layout_picker{
  /* display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: stretch;
  font-size: 10px; */
  width: 100px;
  /* padding: 0.5em; */
}

.tag{
  border-style: solid;
  border-width: 3px;
  border-radius: 5px;
}

.tag-header{
  border-bottom: 3px solid black;
  margin: 0 0;
}
</style>

<script>
import Picker from 'vanilla-picker';
import { fabric } from 'fabric';

export default{
  data(){
    return {
      color: ''
    }
  },
  mounted(){
    const canvasContainer = document.getElementById('canvas-container');
    console.log(canvasContainer.clientWidth)

    window.addEventListener("resize", ()=> {
      const boxWidth = canvasContainer.clientWidth
      console.log('cek nilai boxWidht: ', boxWidth)
      canvasContainer.style.height = `${boxWidth*0.5625}px`
    })

    /*
    * picker configuration
    */
    const picker = new Picker({
      parent: document.querySelector('#colorPicker'),
      popup: false,
      alpha: false,
      layout: 'default',
      // editor: true,
      editorFormat: 'hex',
      onChange: (color) => {
        this.color = color.hex
        this.color = this.color.slice(0,7)
      }
    });

    /*
    * Fabric JS Configuration
    */

				// do something after the dom has updated
        const image = new Image()
        // image.src = 'http://fabricjs.com/assets/jail_cell_bars.png';
        image.src = require('@/assets/images/dummyImage1.jpg')

        let canvas = new fabric.Canvas('canvas', { 
          selection: false,
        });

        fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
        image.onload = function () {

          console.log(image.width)
          console.log(image.height)
          canvas.setBackgroundImage(
            require('../../../assets/images/dummyImage1.jpg'),
            canvas.renderAll.bind(canvas),{
              scaleX: canvas.width / image.width,
              scaleY: canvas.height / image.height
            }
          );
        }

        let circle, line;
        let isDone = false;
        let isOver = false;
        let startDrawing = false;
        let lines = [];
        let circles = [];
        let x2 = 0;
        let y2 = 0;
        let circleIndex;
    
    
        canvas.on('mouse:down', function (options) {
          if(!isDone){
            startDrawing = true;
            let pointer = canvas.getPointer(options.pointer);
    
            let points = [pointer.x, pointer.y, pointer.x, pointer.y];
            
            if(!isOver){
              line = new fabric.Line(points, {
                  strokeWidth: 3,
                  fill: 'red',
                  stroke: 'red',
                  originX: 'center',
                  originY: 'center',
                  zIndex: 100,
                  selectable: false
              });
              circle = new fabric.Circle({
                left: line.x1,
                top: line.y1,
                strokeWidth: 1,
                opacity: 0.5,
                radius: 10,
                fill: 'transparent',
                stroke: '#666',
                perPixelTargetFind: true,
                selectable: false
              });
              circle.hasControls = circle.hasBorders = false;
              circles.push(circle);
              canvas.add(circle)
              lines.push(line);
              circle.lineId = lines.length - 1;
              canvas.add(line);
            }
            else{
              circles[circleIndex].set('radius', 10);
              circles[circleIndex].set('opacity', 0.5);
              canvas.renderAll();
              line.set({ x2: x2, y2: y2 });
              isOver = false;
              isDone = true;
              startDrawing = false;
            }
          }
        });
    
        canvas.on('mouse:move', function (options) {
            let pt = { x: options.pointer.x, y: options.pointer.y };
    
            for (let i = 0; i < circles.length; i++) {
                if (circles[i].containsPoint(pt)) {
                    if (!circles[i].mouseOver) {
                        circles[i].mouseOver = true;
                        circles[i].set('radius', 15);
                        circles[i].set('opacity', 1.5);
                        circles[i].set('selectable', false);
                        canvas.requestRenderAll();
                        isOver = true;
                        circleIndex = i;
    
                        x2 = lines[circles[i].lineId].x1;
                        y2 = lines[circles[i].lineId].y1;
                        
    
                    }
                } else if (circles[i].mouseOver) {
                    circles[i].mouseOver = false;
                    circles[i].set('opacity', 0.5);
                    circles[i].set('radius', 10);
                    circles[i].set('selectable', false);
                    canvas.requestRenderAll();
                    isOver = false;
                }
            }
    
            if (!startDrawing) {
                return;
            }
            let pointer = canvas.getPointer(options.pointer);
    
            if (isOver) {
                line.set({ x2: x2, y2: y2 });
            } else {
                line.set({ x2: pointer.x, y2: pointer.y });
            }
    
            canvas.requestRenderAll();
        });


  }
}
</script>
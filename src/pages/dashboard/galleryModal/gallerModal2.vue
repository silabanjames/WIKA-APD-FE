<template>
    <!-- <div class="mdl position-fixed top-50 start-50 translate-middle vw-100 vh-100" > -->
    <div class="mdl position-fixed top-0 start-0 vw-100 vh-100 overflow-auto d-flex align-items-center justify-content-center" id="mdl">
      <div class="mdl-content position-relative w-75 h-auto shadow-sm">
        <div class="px-3 py-4 bg-white rounded">
          
          <div class="d-flex flex-column align-items-start w-auto pb-1">
            <h5 class="fw-bold py-1 m-0">GALLERY</h5>
            <div class="w-100 d-flex justify-content-between">
              <div class="small text-secondary">CCTV View & Image Tagging</div>
              <div class="small text-secondary">dd/mm/yyyy 08:00:00 - CCTV 1</div>
            </div>
          </div>
  
          <div class="row">
            <div class="col-lg-9">
  
              <div class="bg-secondary" id="canvas-container2" style="width: 100%;">
                <canvas class=" top-0 start-0 border border-2" id="canvas2" style="width: 100%; height: 100%;"></canvas>
              </div>
            
            </div>
            <div class="col-lg-3 d-flex flex-column">
  
              <div class="colorPicker2 d-flex justify-content-center pb-2 pt-lg-0 pt-2" id="colorPicker2" style="width: 100%;"></div>
  
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
              <div class="d-flex flex-wrap justify-content-between mt-2">
                <!-- <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Close</button> -->
                <button class="btn btn-secondary mb-1" type="button" @click="closeModal">Close</button>
                <button class="btn btn-primary mb-1" type="button">Save changes</button>
              </div>
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

.mdl{
  z-index: 100;
  background: rgba(60, 65, 75, 0.75);
}

.mdl-content {
  height: 90%;
}
</style>

<script>
import Picker from 'vanilla-picker';
import { fabric } from 'fabric';

export default{
  data(){
    return {
      color: '',
      check: "text"
    }
  },
  methods: {
    closeModal(){
      this.$emit('close')
    },
    checkMethod(){
      console.log('check')
    }
  },
  mounted(){
    // Close modal by click outside
    const outerModal = document.querySelector('#mdl')
    const closeModal = this.closeModal
    window.onclick = function(event) {
      if (event.target == outerModal) {
        closeModal()
      }
    }
    
    /*
    * picker configuration
    */
    const picker = new Picker({
      parent: document.querySelector('#colorPicker2'),
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
        const canvasContainer = document.getElementById('canvas-container2');
        let boxWidth = canvasContainer.clientWidth
        canvasContainer.style.height = `${boxWidth*0.5625}px`
        
        let canvas = new fabric.Canvas('canvas2', { 
          selection: false,
        });

        canvas.setWidth(canvasContainer.clientWidth)
        canvas.setHeight(canvasContainer.clientHeight)
        fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

        // Resize canvas, canvasContainer, and Image while window is resize
        window.addEventListener("resize", ()=> {
          boxWidth = canvasContainer.clientWidth
          canvasContainer.style.height = `${boxWidth*0.5625}px`

          canvas.setWidth(canvasContainer.clientWidth)
          canvas.setHeight(canvasContainer.clientHeight)

          fabric.Image.fromURL( 
            require('../../../assets/images/dummyImage1.jpg'), 
            function(img){
            img.set({
              originX: 'left',
              originY: 'top',
              scaleX: canvas.getWidth() / img.width,
              scaleY: canvas.getHeight() / img.height
            })
            canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
          })
        })
        
        // Set Image Background
        fabric.Image.fromURL( 
          require('../../../assets/images/dummyImage1.jpg'), 
          function(img){
          img.set({
            originX: 'left',
            originY: 'top',
            scaleX: canvas.getWidth() / img.width,
            scaleY: canvas.getHeight() / img.height
          })
          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
        })


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
                  fill: 'green',
                  stroke: 'green',
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
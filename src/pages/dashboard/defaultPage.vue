<template>

    <div class="container-fluid">
        <!-- <Breadcrumbs main="Starter Kit"/> -->

        <div class="d-flex  flex-column flex-sm-row justify-content-between pt-3 pb-3">
          <h1 >Dashboard</h1>

          <div class="mx-auto mx-sm-0">
            <button class="btn btn-square btn-danger  me-3">
              <vue-feather type="alert-circle" class="align-middle"></vue-feather> Show Guide
            </button>
            <button class="btn btn-square btn-warning">
              <vue-feather type="plus" class="align-middle"></vue-feather> Add Camera
            </button>
          </div>
        </div>

        <div class="row align-items-stretch">
          <div class="col-lg-8">
            <Camera />
          </div>

          <div class="col-lg-4">
            <Graphics />
          </div>
        </div>

    </div>

    <!-- <div>
      <GalleryModal2 />
    </div> -->
</template>


<script>
import Graphics from "./graphics/graphics.vue"
import Camera from "./camera/camera.vue"


import GalleryModal2 from "../dashboard/galleryModal/gallerModal2.vue"

export default{
  components: { Graphics, Camera, GalleryModal2 },
  mounted(){
    let canvas = new fabric.Canvas('canvas2', { 
      selection: false
    });
    fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

    let circle, line;
    let isDone = false;
    let isOver = false;
    let startDrawing = false;
    let lines = [];
    let circles = [];
    let id = 1;
    let x2 = 0;
    let y2 = 0;
    let circleIndex;


    canvas.on('mouse:down', function (options) {
      console.log("tekan: ")
      console.log(options)
      if(!isDone){
        startDrawing = true;
        // let pointer = canvas.getPointer(options.e);
        let pointer = canvas.getPointer(options.pointer);

        let points = [pointer.x, pointer.y, pointer.x, pointer.y];
        
        if(!isOver){
          line = new fabric.Line(points, {
              strokeWidth: 3,
              fill: 'red',
              stroke: 'red',
              originX: 'center',
              originY: 'center',
              selectable: false
          });
          console.log(line)
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
          canvas.requestRenderAll();
          line.set({ x2: x2, y2: y2 });
          isOver = false;
          isDone = true;
          startDrawing = false;
        }
      }
    });

    canvas.on('mouse:move', function (options) {
        // let pt = { x: options.e.clientX, y: options.e.clientY };
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
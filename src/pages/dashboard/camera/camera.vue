<template>
    <div class="card">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <span class="bg-success py-2 px-3 rounded-pill">Connection</span>
          </div>
          <div class="d-flex">
            <select class="form-select me-3">
              <option value="c01">Camera_001</option>
              <option value="c02">Camera_002</option>
              <option value="c03">Camera_003</option>
            </select>
            <button class="btn btn-info" type="button" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">GALLERY</button>
            <div class="modal fade" id="exampleModalCenter" aria-hidden="true">
              <GalleryModal />
            </div>
          </div>
        </div>

        <div>
          <!-- <img src="" alt=""> -->
          <div class="bg-secondary mt-3 position-relative" style="width: 100%; padding-top: 56.25%;">
            <img src="" alt="CCTV" class="position-absolute top-0 start-0 img-fluid" id="display-video">
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import GalleryModal from "../galleryModal/galleryModal"
import { io } from "socket.io-client"

export default{
  components: {
    GalleryModal
  },
  mounted(){
    const socket = io(process.env.VUE_APP_WEBSOCKET_URL, {
      transports: ['websocket']
    })

    let imgChunks = [];

    socket.on('connect', ()=>{
    console.log(`You connected with id: ${socket.id}`)
    })

    socket.on('receive-video', chunk => {
      let img = document.getElementById('display-video')
      imgChunks.push(chunk);
      console.log('cek data ', chunk)
      img.setAttribute('src', 'data:image/jpg;base64,' + chunk.buffer);
    })

    socket.on('connect_error', (error)=>{
    console.error(error)
    })
  }
}
</script>
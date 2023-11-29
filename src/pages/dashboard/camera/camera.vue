<template>
  <div class="card">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <span class="bg-success py-2 px-3 rounded-pill">Connection</span>
        </div>
        <div class="d-flex">
          <select class="form-select me-3" id="cameraSelector" v-model="activeCamera">
            <option value="" selected disabled hidden>- Choose Camera -</option>
            <option value="c01">Camera_001</option>
            <option value="c02">Camera_002</option>
            <option value="c03">Camera_003</option>
          </select>
          

          <!-- <button class="btn btn-info" type="button" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">GALLERY</button>
          <div class="modal fade" id="exampleModalCenter" aria-hidden="true">
            <GalleryModal />
          </div> -->

          <button class="btn btn-info" type="button" @click="toggleModal">GALLERY</button>
          <div class="mdl-fade" v-if="showModal">
            <GalleryModal2 @close="toggleModal" />
          </div>

        </div>
      </div>

      <div>
        <!-- <img src="" alt=""> -->
        <div class="bg-secondary mt-3" id="videoMonitor" style="width: 100%;">
          <img src="" alt="CCTV" class="img-fluid" id="display-video">
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import GalleryModal from "../galleryModal/galleryModal"
import GalleryModal2 from "../galleryModal/galleryModal2.vue"
import { io } from "socket.io-client"


export default{
data(){
  return {
    showModal: false,
  }
},
computed: {
  activeCamera: {
    get(){
      return this.$store.state.dashboard.activeCamera
    },
    set(value){
      this.$store.commit('dashboard/editActiveCamera', value)
    }
  }
},
methods: {
  toggleModal(){
    this.showModal = !this.showModal
  }
},
components: {

  GalleryModal,
  GalleryModal2
},
mounted(){
  const cameraSelector = document.querySelector('#cameraSelector')
  cameraSelector.addEventListener('change', ()=>{
    console.log('change')
  })

  const videoMonitor = document.querySelector('#videoMonitor')
  let videoWidth = videoMonitor.clientWidth
  videoMonitor.style.height = `${videoWidth*0.5625}px`

  window.addEventListener("resize", ()=> {
    videoWidth = videoMonitor.clientWidth
    videoMonitor.style.height = `${videoWidth*0.5625}px`      

    const socket = io(process.env.VUE_APP_WEBSOCKET_URL, {
      transports: ['websocket']
    })

    let imgChunks = [];

    socket.on('connect', ()=>{
    console.log(`You connected with id: ${socket.id}`)
    })

    socket.on('video_channel', chunk => {
      let img = document.getElementById('display-video')
      imgChunks.push(chunk);
      // console.log('cek data ', chunk)
      img.setAttribute('src', 'data:image/jpg;base64,' + chunk.buffer);
    })

    socket.on('video_counting', data => {
      console.log(`hasil data counting:`)
      console.log(data)
    })  

    socket.on('connect_error', (error)=>{
    console.error(error)
    })
  })
}
}
</script>
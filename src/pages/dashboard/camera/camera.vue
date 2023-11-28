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
            <video ref="videoPlayer" controls></video>
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
    },
    initializeSocket() {
      const socket = io("http://localhost:3001"); // Sesuaikan dengan URL server socket Anda
      const videoPlayer = this.$refs.videoPlayer;

      socket.on("video_channel", (data) => {
        const videoData = data.message.trim();

        // Convert base64 to Blob
        const blob = this.base64ToBlob(videoData);

        // Create a data URL from Blob
        const dataUrl = URL.createObjectURL(blob);

        videoPlayer.src = dataUrl;
        videoPlayer.play();
      });
    },
    base64ToBlob(base64) {
      const binaryString = atob(base64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);

      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      return new Blob([bytes], { type: "video/mp4" }); // Adjust the MIME type as needed
    },
  },
  components: {

    GalleryModal,
    GalleryModal2
  },
  mounted(){
    this.initializeSocket()
  }
}
</script>
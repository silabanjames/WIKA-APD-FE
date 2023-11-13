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

            <!-- <button class="btn btn-info" type="button" @click="toggleModal">GALLERY</button>
            <div class="mdl-fade" v-if="showModal">
              <GalleryModal2 @close="toggleModal" />
            </div> -->


          </div>
        </div>

        <div>
          <!-- <img src="" alt=""> -->
          <div class="bg-secondary mt-3" style="width: 100%; padding-top: 56.25%;">
            
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import GalleryModal from "../galleryModal/galleryModal"
import GalleryModal2 from "../galleryModal/gallerModal2.vue"

export default{
  data(){
    return {
      showModal: false
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
  }
}
</script>
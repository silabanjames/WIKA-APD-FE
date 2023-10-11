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
          <div class="col-lg-9 col-">
            <div class="bg-secondary" style="width: 100%; padding-top: 56.25%;">

            </div>
          </div>
          <div class="col-lg-3 justify-content-between">
            <div>
              <div class="colorPicker" id="colorPicker" style="width: 100%;"></div>
              <!-- <v-color-picker></v-color-picker> -->
              <!-- <input type="color"> -->
            </div>

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
            <div class="d-flex flex-wrap justify-content-between">
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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: stretch;
  font-size: 10px;
  width: 100%;
  padding: 0.5em;
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

export default{
  data(){
    return {
      color: ''
    }
  },
  mounted(){
    new Picker({
      parent: document.querySelector('#colorPicker'),
      popup: false,
      alpha: false,
      layout: 'default',
      editor: true,
      editorFormat: 'hex',
      onChange: (color) => {
        this.color = color.hex
        this.color = this.color.slice(0,7)
      }
    });

    
  }
}
</script>
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
          <div class="col-3 justify-content-between">
            <div>
              <div class="example" id="example"></div>
            </div>

            <!-- Modal Button -->
            <div class="d-flex justify-content-between">
              <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Close</button>
              <button class="btn btn-primary" type="button">Save changes</button>
            </div>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
import Picker from 'vanilla-picker';

export default{
  mounted(){
    console.log('run')
    new Picker({
        parent: document.querySelector('#example'),
        popup: false,
        alpha: false,
        layout: 'default',
        editor: true,
        editorFormat: 'hex',
      });
  }
}
</script>
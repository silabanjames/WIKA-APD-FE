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
</template>


<script>
import Graphics from "./graphics/graphics.vue"
import Camera from "./camera/camera.vue"

export default{
  components: { Graphics, Camera }
}
</script>
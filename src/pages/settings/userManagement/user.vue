<template>
    <div class="col-sm-12">
      <div class="card">
        <div class="card-header">
          <h5>User</h5>
          <a href="#" class="position-absolute top-50 end-0 translate-middle btn btn-info">
            <vue-feather type="user-plus"></vue-feather> <span class="ms-1">Add User</span>
          </a>
        </div>
        <div class="table-responsive">
          <table class="table table-striped bg-primary align-middle " id="basic-1">
            <thead class="tbl-strip-thad-bdr">
              <tr>
                <th scope="col" width="50px">#</th>
                <th scope="col" tabindex="0" rowspan="1" colspan="1" style="width: 113.766px;"></th>
                <th scope="col" tabindex="0" rowspan="1" colspan="1" style="width: 768.172px;">Name</th>
                <th scope="col" tabindex="0" rowspan="1" colspan="1" style="width: 243.266px;"> </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in bootstraplist" :key="index" >
                <td scope="row" >
                  {{ item.id }}
                </td>
                <td>
                  <img :src="getImageUrl('user/2.jpg')" alt="">
                </td>
                <td>
                  <h5>
                    {{ item.lastName }}
                  </h5>
                  <span>
                    {{ item.userName }}
                  </span>
                </td>
                <td>
                  <button class="btn btn-info btn-xs" type="button"
                  data-original-title="btn btn-danger btn-xs" title="">
                    <vue-feather type="edit"></vue-feather>
                  </button>
                  <button class="btn btn-danger btn-xs ms-1" type="button"
                  data-original-title="btn btn-danger btn-xs" title="">
                    <vue-feather type="trash-2"></vue-feather>
                  </button>
                </td>

              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  import getImage from "@/mixins/getImage"
  export default {
    mixins: [getImage],
    computed: {
      ...mapState({
        bootstraplist: state => state.bootstrap.bootstrap
      })
    },
  }
  </script>
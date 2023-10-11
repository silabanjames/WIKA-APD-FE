<template>
    <div class="col-sm-12 p-15 mx-auto">
      <div class="card">
            <div class="card-header d-flex justify-content-end">
              <b-button size="md" class="btn btn-primary">
                <vue-feather type="user-plus" size="20" />
                Add User
              </b-button>
            </div>
        <div class="table-responsive p-3">
          <table class="table align-items-center rounded">
              <thead class="align-items-center text-center ">
              <tr>
                <th scope="col" class="text-center bg-success-subtle text-black " style="width: 8%;" ><h5>#</h5></th>
                <th scope="col" rowspan="1" colspan="1" class="text-center bg-success-subtle text-black w-25 text-center"><h5>Image</h5></th>
                <th scope="col" tabindex="0" rowspan="1" colspan="1" class="text-center bg-success-subtle text-black w-50"><h5>Name</h5></th>
                <th scope="col" tabindex="0" rowspan="1" colspan="1" class="text-center bg-success-subtle text-black w-25"> </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in bootstraplist" :key="index" >
                <td scope="row" class="text-center" >
                  {{ item.id }}
                </td>
                <td class="text-center">
                  <img :src="getImageUrl('user/2.jpg')" alt="" class="">
                </td>
                <td class="col text-center">
                  <h5 class=" text-justify">
                    {{ item.lastName }}
                  </h5>
                  <span class="text-justify">
                    {{ item.userName }}
                  </span>
                </td>
                <td>
                  <div class="flex">
                    <vue-feather type="edit" stroke="green" />
                    <vue-feather type="trash-2" stroke="red" />
                  </div>
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
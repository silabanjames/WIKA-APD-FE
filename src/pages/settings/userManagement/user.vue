<template>
  <div class="col-sm-12 p-15 mx-auto">
    <div class="card">
      <div class="card-header d-flex justify-content-end">
        <RouterLink :to="{ name: 'addUser' }" class="btn btn-primary">
          <vue-feather type="user-plus" size="20" />
          Add User
        </RouterLink>
      </div>
      <div class="table-responsive p-3 align-items-center">
        <table class="table align-items-center rounded">
          <thead class="align-items-center text-center ">
            <tr>
              <th
                scope="col"
                class="text-center bg-success-subtle text-black"
                style="width: 8%"
              >
                <h5>No</h5>
              </th>
              <th
                scope="col"
                rowspan="1"
                colspan="1"
                class="text-start bg-success-subtle text-black w-25 text-center"
              >
                <h5>Image</h5>
              </th>
              <th
                scope="col"
                tabindex="0"
                rowspan="1"
                colspan="1"
                class="text-start bg-success-subtle text-black w-50"
              >
                <h5>Name</h5>
              </th>
              <th
                scope="col"
                tabindex="0"
                rowspan="1"
                colspan="1"
                class="text-center bg-success-subtle text-black w-25"
              ></th>
            </tr>
          </thead>
          <tbody class="align-middle">
            <!-- <tr v-for="(item, index) in bootstraplist" :key="index"> -->
            <tr v-for="(item, index) in users_data" :key="index">
              <td scope="row" class="text-center">
                {{ index + 1 }}
              </td>
              <td class="text-center">
                <img :src="item.profilePicture" alt="" class="rounded foto" />
              </td>
              <td class="col text-start">
                <h5 class="text-justify">
                  {{ item.name }}
                </h5>
                <span class="text-justify">
                  {{ item.email }}
                </span>
              </td>
              <td>
                <div class="flex">
                  <RouterLink
                    :to="{ name: 'editUser', params: { id: item.id } }"
                    userId="test"
                  >
                    <vue-feather type="edit" stroke="green" @click="editUser(item.id)"/>
                  </RouterLink>
                  <vue-feather type="trash-2" stroke="red" @click="deleteUser(item.id)" class="hover-pointer"/>
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
import getImage from "@/mixins/getImage";
import axiosInstance from "@/lib";
import Swal from 'sweetalert2'
import store from "@/store";
export default {
  mixins: [getImage],
  data() {
    return {
      bootstraplist: [],
      image: '',
      name: '',
      email: ''
    };
  },
  computed: {
    users_data: {
      get(){
        return this.$store.state.settings.users_data
      }
    }
  },
  async beforeMount() {
    await this.$store.dispatch("settings/getAllUsers")
  },
  methods: {
    deleteUser(id){
      this.$store.dispatch('settings/deleteUser', {id})
    },
  },
};
</script>

<style>
.hover-pointer{
  cursor: pointer;
}

.foto{
  max-width: 100px;
  aspect-ratio: 1/1;
  object-fit: cover;
}
</style>

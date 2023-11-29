<template>
  <div class="col-sm-12 p-15 mx-auto">
    <div class="card">
      <div class="card-header d-flex justify-content-end">
        <RouterLink :to="{ name: 'addUser' }" class="btn btn-primary">
          <vue-feather type="user-plus" size="20" />
          Add User
        </RouterLink>
      </div>
      <div class="table-responsive p-3">
        <table class="table align-items-center rounded">
          <thead class="align-items-center text-center">
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
                class="text-center bg-success-subtle text-black w-25 text-center"
              >
                <h5>Image</h5>
              </th>
              <th
                scope="col"
                tabindex="0"
                rowspan="1"
                colspan="1"
                class="text-center bg-success-subtle text-black w-50"
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
          <tbody>
            <tr v-for="(item, index) in bootstraplist" :key="index">
              <td scope="row" class="text-center">
                {{ index + 1 }}
              </td>
              <td class="text-center">
                <img :src="getImageUrl('user/2.jpg')" alt="" class="" />
              </td>
              <td class="col text-center">
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
                    <vue-feather type="edit" stroke="green" />
                  </RouterLink>
                  <vue-feather type="trash-2" stroke="red" @click="confirmationRemove(item.id)" class="hover-pointer"/>
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
export default {
  mixins: [getImage],
  data() {
    return {
      bootstraplist: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const res = await axiosInstance.get('/user');
        this.bootstraplist = res.data;
        // console.log(this.bootstraplist);
      } catch (error) {
        console.log(error);
      }
    },
    async confirmationRemove(id) {
      // Use SweetAlert or any other confirmation dialog library here
      const confirmResult = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this user!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
      });

      if (confirmResult.isConfirmed) {
        // User confirmed, proceed with the delete action
        await this.removeUser(id);
      }
    },
    async removeUser(id) {
      try {
        // Make the API call to delete the user
        await axiosInstance.delete(`/user/${id}`);
        // Refresh the data after successful deletion
        this.getData();
        // Show success message
        Swal.fire({
          title: 'User Deleted Successfully!',
          icon: 'success',
        });
      } catch (error) {
        // Handle error, show error message
        console.error('Error deleting user:', error);
        Swal.fire({
          title: 'Error',
          text: 'An error occurred while deleting the user.',
          icon: 'error',
        });
      }
    },
    
  },
};
</script>

<style>
.hover-pointer{
  cursor: pointer;
}
</style>

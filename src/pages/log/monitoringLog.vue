<template>
  <div class="container-fluid">
    <div class="mt-3">
      <FilterData />
    </div>

    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-header">
            <h5>Monitoring Log</h5>
          </div>
          <div class="card-body">
            <div class="table-responsive product-table">
              <table class="table display" id="basic-1">
                <thead class="align-middle">
                  <tr>
                    <th>No</th>
                    <th
                      class="sorting_asc"
                      tabindex="0"
                      aria-controls="basic-1"
                      rowspan="1"
                      colspan="1"
                      aria-sort="ascending"
                      aria-label="Image: activate to sort column descending"
                    >
                      Image
                    </th>
                    <th>Person ID.</th>
                    <th
                      class="sorting"
                      tabindex="0"
                      aria-controls="basic-1"
                      rowspan="1"
                      colspan="1"
                      aria-label="Details: activate to sort column ascending"
                    >
                      Camera Name
                    </th>
                    <th>Camera Location</th>
                    <th>Jabatan</th>
                    <th
                      class="sorting"
                      tabindex="0"
                      aria-controls="basic-1"
                      rowspan="1"
                      colspan="1"
                      aria-label="Amount: activate to sort column ascending"
                    >
                      Helm
                    </th>
                    <th
                      class="sorting"
                      tabindex="0"
                      aria-controls="basic-1"
                      rowspan="1"
                      colspan="1"
                      aria-label="Stock: activate to sort column ascending"
                    >
                      Vest
                    </th>
                    <th>Boots</th>
                    <th>Violence</th>
                    <th
                      class="sorting"
                      tabindex="0"
                      aria-controls="basic-1"
                      rowspan="1"
                      colspan="1"
                      aria-label="Start date: activate to sort column ascending"
                    >
                      Timestamp
                    </th>
                    <th
                      class="sorting text-center"
                      tabindex="0"
                      aria-controls="basic-1"
                      rowspan="1"
                      colspan="1"
                      aria-label="Action: activate to sort column ascending"
                      style="width: 130px"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="align-middle">
                  <template v-for="(track, index) in trackingList" :key="index">
                    <tr v-if="!date || compareDate(track.timestamp)">
                      <td>{{ index + 1 }}</td>
                      <td>
                        <!-- <img :src="getImgUrl(track.image)" alt="" /> -->
                        {{ track.track.isSafe }}
                      </td>
                      <td>
                        {{ track.id }}
                      </td>
                      <td>
                        {{ track.camera_name }}
                      </td>
                      <td>
                        {{ track.camera_location }}
                      </td>
                      <td>
                        {{ track.track.jabatan }}
                      </td>
                      <td>
                        <vue-feather
                          :type="track.helm ? 'check' : 'x'"
                        ></vue-feather>
                      </td>
                      <td>
                        <vue-feather
                          :type="track.vest ? 'check' : 'x'"
                        ></vue-feather>
                      </td>
                      <td>
                        <vue-feather
                          :type="track.boot ? 'check' : 'x'"
                        ></vue-feather>
                      </td>
                      <td>
                        {{ track.violance ? "langgar" : "tidak" }}
                      </td>
                      <td>
                        {{ track.timestamp }}
                      </td>
                      <td>
                        <button
                          class="btn btn-info btn-xs"
                          type="button"
                          data-original-title="btn btn-danger btn-xs"
                          title=""
                        >
                          <vue-feather type="check"></vue-feather>
                        </button>
                        <button
                          class="btn btn-danger btn-xs ms-1"
                          type="button"
                          data-original-title="btn btn-danger btn-xs"
                          title=""
                          @click="removeLog(track.id)"
                        >
                          <vue-feather type="x"></vue-feather>
                        </button>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { mapState, mapGetters } from "vuex";
import FilterData from "./filter.vue";
import axiosInstance from "@/lib";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      // trackingList: [],
    };
  },
  created() {
    // this.getData();
  },
  name: "tracingList",
  components: { FilterData },
  computed: {
    ...mapState({
      trackingList: (state) => state.log.trackingList,
      date: (state) => state.log.date,
    }),
    ...mapGetters("log", ["compareDate"]),
  },
  methods: {
    async getData() {
      try {
        const res = await axiosInstance.get("/equipment");
        this.trackingList = res.data.records;
        // console.log(this.trackingList);
      } catch (error) {
        console.log(error);
      }
    },
    async removeLog(id) {
      try {
        const confirmResult = await Swal.fire({
          title: "Are you sure?",
          text: "Delete this data ?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "delete",
        });
        if(confirmResult.isConfirmed){
          await axiosInstance.delete(`/equipment/${id}`);
          toast("Data telah dihapus.", { autoClose: 1000, type: "success" }); // ToastOptions
          this.getData();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  /*
   * Uncomment untuk mendapatkan data dengna request
   */
  beforeMount(){
      this.$store.dispatch('log/getRequestData')
      console.log('cek tracking list')
      console.log(this.$store.state.logs.trackingList)
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/utils/variables";
@import "@/assets/scss/components/datatable";
</style>
<style scoped>
@import "@/assets/css/productlist.css";
</style>

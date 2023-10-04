<template>

    <div class="container-fluid">
        <div  class="mt-3">
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
                            <table class="display" id="basic-1">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th class="sorting_asc" tabindex="0" aria-controls="basic-1" rowspan="1" colspan="1"
                                        aria-sort="ascending" aria-label="Image: activate to sort column descending"
                                        
                                        >
                                            Image
                                        </th>
                                        <th>
                                            Person ID.
                                        </th>
                                        <th class="sorting" tabindex="0" aria-controls="basic-1" rowspan="1" colspan="1"
                                        aria-label="Details: activate to sort column ascending">
                                            Camera Name
                                        </th>
                                        <th>
                                            Camera Location
                                        </th>
                                        <th>
                                            Jabatan
                                        </th>
                                        <th class="sorting" tabindex="0" aria-controls="basic-1" rowspan="1" colspan="1"
                                        aria-label="Amount: activate to sort column ascending">
                                            Helm
                                        </th>
                                        <th class="sorting" tabindex="0" aria-controls="basic-1" rowspan="1" colspan="1"
                                        aria-label="Stock: activate to sort column ascending">
                                            Vest
                                        </th>
                                        <th>
                                            Boots
                                        </th>
                                        <th>
                                            Violence
                                        </th>
                                        <th class="sorting" tabindex="0" aria-controls="basic-1" rowspan="1" colspan="1"
                                        aria-label="Start date: activate to sort column ascending">
                                            Timestamp
                                        </th>
                                        <th class="sorting" tabindex="0" aria-controls="basic-1" rowspan="1" colspan="1"
                                        aria-label="Action: activate to sort column ascending" style="width: 130px;">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="product in productList" :key="product">
                                        <td>no.</td>
                                        <td>
                                            <img :src="getImgUrl(product.image)" alt="">
                                        </td>
                                        <td>
                                            ID
                                        </td>
                                        <td>
                                            <h6> {{ product.product_name }}</h6><span>{{ product.product_desc }}</span>
                                        </td>
                                        <td>Location</td>
                                        <td>
                                            jabat
                                        </td>
                                        <td><vue-feather type="x"></vue-feather></td>
                                        <td :class="product.stockStatus"><vue-feather type="x"></vue-feather></td>
                                        <td><vue-feather type="check"></vue-feather></td>
                                        <td>langgar</td>
                                        <td>{{ product.start_date }}</td>
                                        <td>
                                            <button class="btn btn-info btn-xs" type="button"
                                            data-original-title="btn btn-danger btn-xs" title="">
                                                <vue-feather type="check"></vue-feather>
                                            </button>
                                            <button class="btn btn-danger btn-xs ms-1" type="button"
                                            data-original-title="btn btn-danger btn-xs" title="">
                                                <vue-feather type="x"></vue-feather>
                                            </button>
                                        </td>
                                    </tr>
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
import { productlist } from "../../data/ecommerce/productList"
import FilterData from './filter.vue'
export default {
    name: 'productList',
    components: {FilterData},
    data() {
        return {
            productList: productlist
        }
    },
    methods: {
        getImgUrl(path) {
            return require("@/assets/images/ecommerce/" + path);
        },
    }
}
</script>

<style lang="scss" scoped>@import "@/assets/scss/utils/variables";
@import "@/assets/scss/components/datatable";</style>
<style scoped>@import "@/assets/css/productlist.css"</style>

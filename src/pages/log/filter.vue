<template>
    <div class="card">
        <form class="form theme-form" @submit.prevent="handleClick">
          <div class="card-body">
            <div class="row">
              <!-- <div class="col">
                <div class="mb-3">
                  <label class="form-label" for="exampleFormControlSelect30"><h6>Date</h6></label>
                  <div>
                    <input class="form-control" type="date" v-model="date">
                  </div>
                </div>
              </div> -->

              <div class="col">
                <div class="mb-3">
                  <label class="form-label" for="formControl30"><h6>Filter</h6></label>
                  <select class="form-select digits" id="formControl30" v-model="filter">
                    <option value="" selected disabled hidden>Equipment</option>
                    <option value="helm">Helm</option>
                    <option value="vest">Vest</option>
                    <option value="boot">Boots</option>
                  </select>
                </div>
              </div>

              <!-- <div class="col">
                <div class="mb-3">
                  <label class="form-label" for="formControl31"><h6>Filter</h6></label>
                  <select class="form-select digits" id="formControl31">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              </div> -->

              <div class="col d-flex align-items-center justify-content-center">
                <div class="mt-3">
                  <button class="btn btn-primary m-r-10" type="submit">Search</button>
                </div>
              </div>

            </div>
          </div>
        </form>
    </div>
</template>

<script>
import axiosInstance from '@/lib'

export default{
  data(){
    return {
      date: null,
      filter: '',
      monitorLogs: []
    }
  },
  computed: {
    date: {
      get(){
        return this.$store.state.log.date
      },
      set(newValue){
        this.$store.commit('log/changeDate', newValue)
      }
    }
  },
  methods:{
    async handleClick(){
      try {
        const res = await axiosInstance.get('/equipment/filter', {
        params: {
          [this.filter]: true
        }
      })
      console.log(res.data.records)
      } catch (error) {
        console.log(error)
      }
    },
    compareDate(dateStr){
      // Estimate the date value is string
      const date = new Date(dateStr)

      return this.date.getTime() === date.getTime()
    },
    handleDate(){
      this.filterData(this.date)
    },
    async filterData(dateParam){
      try {
        const res = await axiosInstance.get(`/equipment/`, {
          params: {
            date: dateParam
          }
        })
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  },

  
}
</script>
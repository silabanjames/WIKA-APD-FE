<template>
    <div class="card">
        <form class="form theme-form">
          <div class="card-body">
            <div class="row">
              <div class="col">
                <div class="mb-3">
                  <label class="form-label" for="exampleFormControlSelect30"><h6>Date</h6></label>
                  <div>
                    <input class="form-control" type="date" v-model="date">
                  </div>
                </div>
              </div>

              <div class="col">
                <div class="mb-3">
                  <label class="form-label" for="formControl30"><h6>Filter</h6></label>
                  <select class="form-select digits" id="formControl30">
                    <option value="" selected disabled hidden>Equipment</option>
                    <option>Helm</option>
                    <option>Vest</option>
                    <option>Boots</option>
                  </select>
                </div>
              </div>

              <div class="col">
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
              </div>

              <div class="col">
                <button @click="handleDate">
                  filter
                </button>
              </div>

            </div>
          </div>
          <!-- <div class="card-footer text-end">
            <button class="btn btn-primary m-r-10" type="submit">Submit</button>
            <input class="btn btn-light" type="reset" value="Cancel">
          </div> -->
        </form>
    </div>
</template>

<script>
import axiosInstance from '@/lib'

export default{
  data(){
    return {
      date: null
    }
  },
  watch:{
    date(oldDate, newDate){
      if(oldDate !== newDate){
        this.filterData(newDate)
      }
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
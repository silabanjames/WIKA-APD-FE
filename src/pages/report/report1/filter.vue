<template>
    <div class="card">
        <form class="form theme-form">
          <div class="card-body">
            <div class="row">
              <div class="col-12 col-md-4">
                <div class="mb-1">
                  <label class="form-label" for="exampleFormControlSelect30"><h6>Date</h6></label>
                  <div>
                    <input class="form-control" type="date" v-model="date">
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-4">
                <div class="mb-1">
                  <label class="form-label" for="formControl30"><h6>Filter</h6></label>
                  <select class="form-select digits" id="formControl30">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
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
export default{
  data(){
    return {
      
    }
  },
  computed: {

  },
  methods:{

  },

  
}
</script>
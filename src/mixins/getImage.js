export default {
    
    methods: {
      getImageUrl(path) {
        if(path){
          return require('@/assets/images/'+path)
          // return require(process.env.VUE_APP_BACKEND_URL + path)
        }
        else
        return ''
      },

    },
  }
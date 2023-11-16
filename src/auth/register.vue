<template>
  <div>
    <div class="container-fluid p-0">
      <div class="row m-0">
        <div class="col-12 p-0">
          <div class="login-card">
            <div>
              <div>
                <a class="logo">
                  <img
                    class="img-fluid for-light"
                    src="../assets/images/logo/logo.png"
                    alt="looginpage"
                  />
                  <img
                    class="img-fluid for-dark"
                    src="../assets/images/logo/logo_dark.png"
                    alt="looginpage"
                  />
                </a>
              </div>
              <div class="login-main">
                <form class="theme-form" @submit.prevent="submitForm">
                  <h4>Create your account</h4>
                  <p>Enter your personal details to create account</p>
                  <div class="form-group">
                    <label class="col-form-label pt-0">Your Name</label>
                    <div class="row g-2">
                      <div class="col-6">
                        <input
                          class="form-control"
                          type="text"
                          required=""
                          placeholder="First name"
                          v-model="first_name"
                        />
                        <span class="validate-error" v-if="!first_name">{{ nameErrMsg }}</span>
                      </div>
                      <div class="col-6">
                        <input
                          class="form-control"
                          type="text"
                          required=""
                          placeholder="Last name"
                          v-model="last_name"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-form-label" >Email Address</label>
                    <input
                      class="form-control"
                      type="email"
                      required=""
                      placeholder="Test@gmail.com"
                      v-model="email"
                    />
                    <span class="validate-error" v-if="!email || !validEmail(email)">{{ emailErrMsg }}</span>
                  </div>
                  <div class="form-group">
                    <label class="col-form-label">Password</label>
                    <div class="form-input position-relative">
  
                      <input
                        class="form-control"
                        :type="active?'password':'text'"
                        name="login[password]"
                        required=""
                        placeholder="*********"
                        v-model="password"
                      />
                      <span class="validate-error" v-if="password.lenght < 7">{{ passwordErrMsg }}</span>
                      <div class="show-hide"><span :class="active?'show':'hide'" @click.prevent="show"> </span></div>
                    </div>
                  </div>
                  <button class="btn btn-primary btn-block w-100 mt-2" type="submit">Create Account</button>
                  <p class="mt-4 mb-0">
                    Already have an account?
                    <router-link class="ms-2" tag="a" to="/auth/login">
                      Login
                    </router-link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            active: true,
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            emailErrMsg: '',
            passwordErrMsg: '',
            nameErrMsg: ''
        }
    },
    methods:{
        show(){
            this.active=!this.active
        },
        submitForm(){
          /*
          * Check name input
          */
          if(!this.first_name){
            this.nameErrMsg = "empty not allowed"
          } else {
            this.nameErrMsg = ""
          }
          
          /*
          * Check email Input
          */
          if(!this.email){
            this.email = "empty not allowed"
          } else if(!this.validEmail(this.email)){
            this.emailErrMsg = 'Valid email required.'
          }
          else{
            this.emailErrMsg = ''
          }
          
          /*
          * Send Password Input
          */
          if(!this.password || this.password < 7){
            this.passwordErrMsg = "empty not allowed"
          } else{
            this.passwordErrMsg = ''
          }

          if(!this.nameErrMsg && !this.emailErrMsg && !this.passwordErrMsg){
            let payload =  {
              first_name: this.first_name, 
              last_name: this.last_name, 
              email: this.email, 
              password: this.password
            }
            let handleRegister = this.$store.dispatch('auth/handleRegister', payload)

            if(!handleRegister){
              alert("email have been used")
            }
            else{
              this.$router.push('/auth/login')
            }
          }

        },
        validEmail: function (email) {
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return re.test(email)
        }
    }
}
</script>

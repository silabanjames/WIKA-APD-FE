<template>
  <div>
    <div class="container-fluid">
      <div class="row">
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
                <form class="theme-form" @submit.prevent="login">
                  <h4>Sign in to account</h4>
                  <p>Enter your email & password to login</p>
                  <div class="form-group">
                    <label class="col-form-label">Email Address</label>
                    <input
                      class="form-control"
                      type="email"
                      required=""
                      placeholder="Test@gmail.com"
                      v-model="email"
                    />
                    <span
                      class="validate-error"
                      v-if="!email || !validEmail(email)"
                      >{{ emailErrMsg }}</span
                    >
                  </div>
                  <div class="form-group">
                    <label class="col-form-label">Password</label>
                    <div class="form-input position-relative">
                      <input
                        class="form-control"
                        :type="active ? 'password' : 'text'"
                        name="login[password]"
                        required=""
                        placeholder="*********"
                        v-model="password"
                      />
                      <span class="validate-error" v-if="password.lenght < 7">{{
                        passwordErrMsg
                      }}</span>
                      <div class="show-hide">
                        <span
                          :class="active ? 'show' : 'hide'"
                          @click.prevent="show"
                        >
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="form-group mb-0">
                    <div class="checkbox p-0">
                      <input id="checkbox1" type="checkbox" />
                      <label class="text-muted" for="checkbox1"
                        >Remember password</label
                      >
                    </div>
                    <router-link
                      class="link"
                      to="/authentication/forgetpassword"
                    >
                      Forgot password?</router-link
                    >
                    <div class="text-end mt-3">
                      <button
                        class="btn btn-primary btn-block w-100"
                        type="submit"
                        @click.prevent="login"
                        :disabled="isFormIncomplete"
                      >
                        Sign in
                      </button>
                    </div>
                  </div>
                  <p class="mt-4 mb-0 text-center">
                    Don't have account?
                    <RouterLink to="/auth/register" class="ms-2"
                      >Create Account</RouterLink
                    >
                    <!-- <a class="ms-2" href="sign-up.html">Create Account</a> -->
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
  name: "login",
  data() {
    return {
      active: true,
    };
  },

  computed: {
    isFormIncomplete() {
      return (
        !this.email ||
        !this.password 
      );
    },
    email: {
      set(value) {
        this.$store.commit("auth/editEmail", value);
      },
      get() {
        return this.$store.state.auth.user.email.value;
      },
    },
    password: {
      set(value) {
        this.$store.commit("auth/editPassword", value);
      },
      get() {
        return this.$store.state.auth.user.password.value;
      },
    },
    emailErrMsg: {
      set(value) {
        this.$store.commit("auth/editEmailErrMsg", value);
      },
      get() {
        return this.$store.state.auth.user.email.errormsg;
      },
    },
    passwordErrMsg: {
      set(value) {
        this.$store.commit("auth/editPasswordErrMsg", value);
      },
      get() {
        return this.$store.state.auth.user.password.errormsg;
      },
    },
  },

  methods: {
    show() {
      this.active = !this.active;
    },
    async login() {
      /*
       * Check Input
       */
      if (!this.password || this.password.length < 7) {
        this.passwordErrMsg = "min length 7";
      } else {
        this.$store.state.auth.passwordErrMsg = "";
      }

      if (!this.email) {
        this.emailErrMsg = "empty not allowed";
      } else if (!this.validEmail(this.email)) {
        this.emailErrMsg = "Valid email required.";
      } else {
        this.emailErrMsg = "";
      }

      /*
       * Send Request to Backend
       */
      let handleLogin = await this.$store.dispatch("auth/handleLogin");
      if (!this.emailErrMsg && !this.passwordErrMsg && !handleLogin) {
        alert("wrong credenstials");
      }
      if (!this.emailErrMsg && !this.passwordErrMsg && handleLogin) {
        console.log(handleLogin);
        this.$router.push("/");
      }
    },
    validEmail: function (email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
  },
};
</script>

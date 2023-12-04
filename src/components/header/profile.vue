<template>
  <li class="profile-nav onhover-dropdown pe-0 py-0">
    <div class="media profile-media">
      <div class="media-body">
        <span class="font-roboto">{{ $store.state.auth.user.name }}</span>
        <p class="mb-0 font-roboto"> {{ $store.state.auth.user.role }} <i class="middle fa fa-angle-down"></i>
        </p>
      </div>
      <img class="foto-profile rounded" :src="$store.state.auth.user.profilePicture" alt="" />
    </div>
    <ul class="profile-dropdown onhover-show-div">
      <li @click="$store.dispatch('auth/handleLogOut')">
          <vue-feather type="log-in"></vue-feather><span>Log out</span>
      </li>
    </ul>
  </li>
</template>

<script>
// import firebase from 'firebase';
// import UserAuth from '../../auth/js/index';

export default {
  name: 'Profile',
  methods: {
    logout: function () {
      // firebase
      //   .auth()
      //   .signOut()
      //   .then(() => {
      //     UserAuth.Logout();
      this.$router.replace('/auth/login');
      localStorage.removeItem('User')
    }
    // },
  },
};
</script>

<style scoped>
.foto-profile{
  max-width: 40px;
  object-fit: cover;
  aspect-ratio: 1/1;
}
</style>

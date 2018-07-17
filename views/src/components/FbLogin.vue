<template>
  <button class="btn btn-primary" @click.prevent="loginClicked()">
    Login with Facebook
  </button>
</template>

<script>
import fb from '@/utils/fb';

export default {
  name: 'FbLogin',
  date() {
    return {
      trigger: false,
    };
  },
  methods: {
    loginClicked() {
      const vm = this;
      this.trigger = true;
      window.FB.login((response) => {
        vm.checkLoginState();
      }, {scope: 'public_profile, email'});
    },

    checkLoginState() {
      const vm = this;
      window.FB.getLoginStatus((response) => {
        if (response.status === 'connected') {
          vm.getUser();
          if (vm.trigger) {
            vm.$router.push({ name: 'Home' });
          }
        } else {
          vm.$router.push({ name: 'Login' });
        }
      });
    },

    getUser() {
      const vm = this;
      const params = {
        fields: 'name,email,picture',
      };
      window.FB.api('/me', params, (response) => {
        console.log('__response__: ', response);
        const payload = {
          name: response.name,
          avatar: response.picture.data.url,
        };
        vm.$emit('user', payload);
      });
    },
  },

  created() {
    const vm = this;
    fb.init().then(() => {
      vm.checkLoginState();
    });
  },
};
</script>

<template>
  <fb:login-button scope="public_profile,email" onlogin="checkLoginState()">
  </fb:login-button>
</template>

<script>
  export default {
    methods: {
      statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        if (response.status === 'connected') {
          // Logged into your app and Facebook.
          this.testAPI();
        } else {
          console.log('disconnected FB')
        }
      },

      checkLoginState() {
        FB.getLoginStatus(function(response) {
          this.statusChangeCallback(response);
        });
      },

      testAPI() {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function(response) {
          console.log('Successful login for: ' + response.name);
          document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
        });
      },
    }
  }
</script>

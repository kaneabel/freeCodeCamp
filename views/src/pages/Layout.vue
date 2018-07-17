<template>
  <div class="ui__layout">
    <app-header :user="user"></app-header>
    <router-view></router-view>
    <live-chat></live-chat>
    <div class="hidden">
      <fb-login @user="getUser($event)"></fb-login>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header';
import LiveChat from '@/components/LiveChat';
import FbLogin from '@/components/FbLogin';

import copyDeep from '@/utils/copy';

export default {
  name: 'Layout',
  components: {
    FbLogin,
    LiveChat,
    'app-header': Header,
  },
  data() {
    return {
      user: {},
    };
  },
  methods: {
    getUser(user) {
      this.user = copyDeep(user);
    },
  },
};
</script>

<style lang="scss" scoped>
  .ui__layout {
    padding: 56px 0;
  }
  .hidden {
    display: none;
  }
</style>

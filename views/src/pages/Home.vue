<template>
  <div class="home">
    <h1>Board App</h1>
    <router-link to="voting">voting app</router-link>
    <live-chat></live-chat>
  </div>
</template>

<script>
import LiveChat from '@/components/LiveChat';

export default {
  name: 'Home',
  components: {
    LiveChat,
  },
};
</script>

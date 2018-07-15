<template>
  <div class="home">
    <hello-world></hello-world>
    <live-chat></live-chat>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld';
import LiveChat from '@/components/LiveChat';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    LiveChat,
  },
};
</script>

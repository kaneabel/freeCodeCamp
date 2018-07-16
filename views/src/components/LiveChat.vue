<template>
  <div class="fb-customerchat"
       :page_id="pageId"
       attribution="setup_tool"
       theme_color="#44bec7"
       logged_in_greeting="Leave me some comment here!"
       logged_out_greeting="Leave me some comment here!"
  >
  </div>
</template>

<script>
import fb from '@/utils/fb';
import { fbPageId } from '../constants';

export default {
  name: 'LiveChat',
  data() {
    return {
      pageId: fbPageId,
    };
  },
  created() {
    fb.init();
  },
};
</script>

<style lang="scss" scoped>
  // Fix box-shadow hidden in chrome
  iframe {
    transform: translateZ(0);
  }
</style>

<template>
  <div class="ui__header">
    <div class="row">
      <div class="col s6 m8">
        <h5>App's name</h5>
      </div>
      <div class="col s6 m4 text-right">
        <div class="ui__avatar">
          <img :src="user.avatar" :alt="user.name" class="circle responsive-img">
          <span class="name">{{ user.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header',
  props: {
    user: {
      default: () => {},
    },
  },
};
</script>
<style lang="scss" scoped>
  .row,
  h5 {
    margin: 0;
  }
  .ui__header {
    position: fixed;
    width: 100%;
    height: 56px;
    top: 0;
    left: 0;
    z-index: 1;
    padding: 12px 24px;
    background-image: linear-gradient(135deg, #ABDCFF 10%, #0396FF 100%);
  }
</style>

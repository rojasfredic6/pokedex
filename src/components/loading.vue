<template lang="pug">
  .loading
    img.pokeball(src="@/assets/img/Loaderpokeball.png")
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style lang="stylus">
.loading
  display grid
  place-items center
  min-width 360px
  height 100vh
  max-height max-content
  & .pokeball
      width 106px
      height 106px
</style>

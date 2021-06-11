<template lang="pug">
.home
  .home-images-container
    picture
      img.pikaBg(src="@/assets/img/pikaBackground.png")
      img.pika(src="@/assets/img/pikapika.png")
  .home-description-content
    p.home-title Welcome to Pokédex
    p.home-description The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokemon world
    .button-start(@click="toListView()") Get started
</template>

<script>
export default {
  name: "Home",
  methods: {
    toListView() {
      this.$router.push({ name: "List" });
    },
  },
};
</script>

<style lang="stylus">
.home
  background-color viewsBackground
  display grid
  height 100vh
  grid-template-areas 'logo'\
                      'content'
  grid-template-rows repeat(2, (1fr))
  grid-template-columns (1fr)
  min-height 360px
  & .home-images-container
    display grid
    grid-area logo
    place-content center
    & picture
      margin-top 30.5px
      display grid
      width 325px
      height 288px
      position relative
      z-index 0
      place-items center
      & .pikaBg
        width 205.95px
        height 205.95px
      & .pika
        position absolute
        left 9.65px
        top -30.5px
        z-index 10
        Width 325px
        Height 288px
  & .home-description-content
    grid-area content
    row-gap 45px
    display grid
    align-content baseline
    justify-items center
    & .home-title
      font-size titleFontSize
      font-weight 700
      text-align center
    & .home-description
      font-size buttonFontSize
      font-weight 500
      text-align center
      color normalText
      margin 0 15px
      max-width 570px
    & .button-start
      mixin-buttons()
      &:active
        background-color pressedButton
</style>

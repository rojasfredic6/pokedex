<template lang="pug">
.list
  //- loading
  .list-content
    .input
      img(src="@/assets/img/lupa.png")
      input(type="text", placeholder="Search")
    .list-detail
      .list-element(v-for="i in 30")
        p Elemento
        img(:src="(false) ? './assets/img/DisabledStar.png' : '../assets/img/ActiveStar.png'")
  .options
    .buttons
      .all
        img(src="@/assets/img/Menu.png")
        p All
      .favoritos
        img(src="@/assets/img/Star.png")
        p Favorites
</template>

<script>
import Loading from "@/components/loading";

export default {
  name: "List",
  components: {
    Loading,
  },
};
</script>

<style lang="stylus">
.list
  display grid
  height 100vh
  z-index 0
  background-color viewsBackground
  & .list-content
    padding 22.5px
    display grid
    grid-template-rows: 72.5px minmax(50px, max-content)
    min-width 315px
    max-width 570px
    height calc(100vh - 72.5px)
    justify-self center
    justify-content center
    max-height max-content

.input
  margin-bottom 22.5px
  mixin-input()
  & img
    place-self center
  & input
    display grid
    min-width 265px
    max-width 520px
    border 0
    background inputsBackground
    outline none

.list-detail
  display grid
  row-gap 10px
  overflow scroll
  -ms-overflow-style none
  scrollbar-width none
  &::-webkit-scrollbar
    display none 
  & .list-element
    height 50px
    display flex
    justify-content space-between
    align-items center
    box-shadow 0 2px 10px 0 rgba(0,0,0,0.04)
    background-color white
    border-radius radioInput
    cursor pointer
    & p , img
      margin 0 5px

.options
  display grid
  grid-template-columns minmax(315px, 570px)
  z-index 5
  height 80px
  // padding 0 22.5px
  justify-content center
  background-color white
  & .buttons
    display grid
    grid-template-columns repeat(2, minmax(150px, 270px))
    justify-content center
    align-items center
    & .all
      height 44px
      display flex
      flex-basis 150px
      background-color normalButton
      border-radius radioButton
      justify-content center
      padding 0 15px
      color white
      cursor pointer
      align-items center
      margin 0 22.5px
      & img , p
        margin 2px
      &:active
        background-color pressedButton
    & .favoritos
      height 44px
      display flex
      flex-basis 150px
      background-color disabledcolor
      border-radius radioButton
      padding 0 22.5px
      color white
      cursor pointer
      align-items center
      justify-content center
      padding 0 3.7px
      margin 0 22.5px
      & img , p
        margin 2px
</style>

<template lang="pug">
  .pokecard
    .pokecard-content
      picture.pokeImg
        img.pokemon(
          :src="pokeData.sprites.front_default"
          style="width: 200px; height: 200px"
          )
        img.close(src="../assets/img/Ex.png", @click="closeModal")
      .pokeDescription
        p Name: 
          span  {{ pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1) }}
        p Weight: 
          span  {{ pokeData.weight }}
        p Height:  
          span  {{ pokeData.height }}
        p Types:  
          span  {{ listTypes }}
      .pokeButtons
        .share 
          p Share to my friends
        .favoriteButton(
          :class=" !favoritos ? 'disable-star' : 'enable-star'"
          @click="addToFavorites(pokeData.name)"
          )
</template>

<script>
export default {
  name: "PokeCard",
  props: {
    pokeData: {
      type: Object || Array,
      require: false,
    },
    listPokemons: {
      type: Array,
    },
  },
  computed: {
    listTypes() {
      const list = this.pokeData.types.map((poke) => {
        return poke.type.name.charAt(0).toUpperCase() + poke.type.name.slice(1);
      });

      return list.join(", ");
    },
    favoritos() {
      const filter = this.listPokemons.findIndex(
        (poke) => this.pokeData.name == poke.name
      );
      return this.listPokemons[filter].favorito;
    },
  },
  methods: {
    closeModal() {
      this.$emit("turnItOff");
    },
    addToFavorites(name) {
      this.$emit("agregarFavorito", name);
    },
  },
};
</script>

<style lang="stylus">
.pokecard
  position absolute
  display grid
  justify-content center
  align-content center
  z-index 100
  width 100%
  height 100vh
  background-color rgba(0,0,0,.5)
  padding 0 22.5px
  & .pokecard-content
    height 506px
    display grid
    grid-template-areas "pokemon"\
    "description"\
    "buttons"
    grid-template-columns minmax(315px, 525px)
    grid-template-rows  repeat(2, (1fr)) 84px
    background-color rgba(255, 255, 255, 1)
    border-radius radioInput
    .pokeImg
      background-image url(../assets/img/pokedexBackground.png)
      background-position center
      background-repeat no-repeat
      position relative
      z-index 101
      display grid
      grid-area pokemon
      justify-items center
      align-items center
      border-radius 5px 5px 0px 0px
      & .close
        position absolute
        z-index 110
        top 10px
        right 10px
        cursor pointer
    & .pokeDescription
      grid-area description
      display grid
      margin 0 30px
      & p
        border-bottom 1px solid disabledcolor
        display flex
        align-items center
        font-weight 700
        color rgba(94, 94, 94, 1)
        font-size buttonFontSize
        & span
          margin-left 5px
          font-weight 500
    & .pokeButtons
      grid-area buttons
      margin 0 30px
      display flex
      justify-content space-between
      align-items center
      & .share
        mixin-buttons()
        width 195px
        &:active
          background-color pressedButton
      & .favoriteButton
        height 44px
        width 44px
.enable-star
  background-image url(../assets/img/ActiveStar.png)
  background-position center
  background-repeat not-repeat
.disable-star
  background-image url(../assets/img/DisabledStar.png)
  background-position center
  background-repeat not-repeat
</style>

<template lang="pug">
.list
  loading(v-show="booleanos.isloading")
  .list-content(v-show="!booleanos.isloading")
    .input
      img(
        src="@/assets/img/lupa.png"
        @click="searchPokemon(search)")
      input(
        type="text", 
        v-model="search", 
        placeholder="Search"
        @keyup.enter="searchPokemon(search)")
    .list-detail(v-if="!booleanos.favoritos")
      .list-element(
        v-if="!booleanos.favoritos"
        v-for="(poke, index) in state.listaPokemon" 
        :key="index"
        @click="pokemonData(poke.url)"
        v-show="!booleanos.searchError"
        )
        p {{ poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}}
        .star(
          :class=" !poke.favorito ? 'disable-star' : 'enable-star'",       
          )
      img.add-more(
        src="@/assets/img/arrow_drop_down_black_24dp.svg"
        @click="addPokemon()"
        v-show="booleanos.addMore"
        )
      .errorBusqueda(v-show="booleanos.searchError")
        p.errorTitle Uh-oh!
        p.errorMessage You look lost on your journey!
        .buttonError
          p Go back home
    .list-detail(v-else)
      .list-element(
        v-if="booleanos.favoritos"
        v-for="(poke, index) in favoritos" 
        :key="index"
        @click="pokemonData(poke.url)"
        v-show="!booleanos.searchError"
        )
        p {{ poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}}
        .star(
          :class=" !poke.favorito ? 'disable-star' : 'enable-star'",       
          )
      img.add-more(
        src="@/assets/img/arrow_drop_down_black_24dp.svg"
        @click="addPokemon()"
        v-show="booleanos.addMore"
        )
      .errorBusqueda(v-show="booleanos.searchError")
        p.errorTitle Uh-oh!
        p.errorMessage You look lost on your journey!
        .buttonError
          router-link(to="/")
            p Go back home
  .options(v-show="!booleanos.isloading && !booleanos.searchError")
    .buttons
      .all(@click="allList()")
        img(src="@/assets/img/Menu.png")
        p All
      .favoritos(
        @click="favoritosTo()"
        :class=" favoritos.length !== 0 ? 'enable-favoritos' : 'disable-favoritos'")
        img(src="@/assets/img/Star.png")
        p Favorites
  poke-card(
    v-if="booleanos.pokeCard", 
    :pokeData="state.selectedPokemon", 
    @turnItOff="closePokeCard"
    @agregarFavorito="addPokemonToFavorites",
    :listPokemons="state.listaPokemon"
    )
</template>

<script>
import Loading from "@/components/loading";
import PokeCard from "@/components/pokeCard";
import { pokemonList } from "@/api/index";
const list_url = "https://pokeapi.co/api/v2/pokemon/";

export default {
  name: "List",
  data() {
    return {
      state: {
        listaPokemon: "",
        selectedPokemon: {},
      },
      booleanos: {
        isloading: true,
        pokeCard: false,
        addMore: true,
        searchError: false,
        favoritos: false,
      },
      offset: 0,
      search: "",
    };
  },
  components: {
    Loading,
    PokeCard,
  },
  created() {
    setTimeout(async () => {
      try {
        const response = await pokemonList(list_url);
        this.state.listaPokemon = response.data.results;
        this.booleanos.isloading = false;
      } catch (err) {
        console.error(err);
      }
    }, 3000);
  },
  computed: {
    favoritos() {
      const matriz = Object.entries(this.state.listaPokemon);
      const lista = matriz.map((m) => m[1]);
      const final = lista.filter((poke) => poke.favorito === true);
      return final;
    },
  },
  methods: {
    async pokemonData(data) {
      try {
        if (this.state.listaPokemon.length > 1) {
          this.booleanos.isloading = true;
          const results = await pokemonList(data);
          this.state.selectedPokemon = results.data;
          this.booleanos.pokeCard = true;
          this.booleanos.isloading = false;
        } else {
          this.state.selectedPokemon = this.state.listaPokemon[0];
          this.booleanos.pokeCard = true;
        }
      } catch (err) {
        console.error(err);
      }
    },
    closePokeCard() {
      this.booleanos.pokeCard = false;
    },
    addPokemon() {
      this.offset += 20;
      pokemonList(list_url, this.offset)
        .then((response) => {
          response.data.results.forEach((poke) =>
            this.state.listaPokemon.push(poke)
          );
        })
        .catch((err) => console.error(err));
    },
    searchPokemon(data) {
      if (this.search.length !== 0) {
        this.booleanos.isloading = true;
        pokemonList(`${list_url}${data.toLowerCase()}`)
          .then((response) => {
            this.state.listaPokemon = [response.data];
            console.log([JSON.stringify(response.data)]);
            this.booleanos.addMore = false;
            this.booleanos.favoritos = false;
          })
          .catch(() => {
            this.booleanos.searchError = true;
            this.booleanos.addMore = false;
          })
          .finally(() => (this.booleanos.isloading = false));
      }
    },
    allList() {
      this.booleanos.isloading = true;
      pokemonList(list_url)
        .then((response) => {
          this.state.listaPokemon = response.data.results;
          this.booleanos.addMore = true;
          this.booleanos.favoritos = false;
        })
        .catch((err) => console.error(err))
        .finally(() => (this.booleanos.isloading = false));
    },
    addPokemonToFavorites(data) {
      const filter = this.state.listaPokemon.findIndex(
        (poke) => data == poke.name
      );
      this.$set(this.state.listaPokemon[filter], "favorito", true);
    },
    favoritosTo() {
      this.booleanos.favoritos = true;
      this.booleanos.addMore = false;
    },
    goPrincipal() {
      this.$router.push({ params:{path: "/"}});
    },
  },
};
</script>

<style lang="stylus">
.list
  display grid
  position relative
  height 100vh
  z-index 0
  background-color viewsBackground
  & .list-content
    padding 22.5px
    display grid
    grid-template-rows: 72.5px minmax(50px, max-content)
    min-width 315px
    max-width 570px
    height calc(100vh - 72px)
    justify-self center
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
    position relative
    z-index 50
    display flex
    justify-content space-between
    align-items center
    box-shadow 0 2px 10px 0 rgba(0,0,0,0.04)
    background-color white
    border-radius radioInput
    cursor pointer
    & p
      margin 0 7px

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
.star
  position relative
  width 44px
  height 44px
  margin 4px

.enable-star
  background-image url(../assets/img/ActiveStar.png)
  background-position center
  background-repeat not-repeat
.disable-star
  background-image url(../assets/img/DisabledStar.png)
  background-position center
  background-repeat not-repeat

.add-more
  justify-self center
  cursor pointer

.errorBusqueda
  display grid
  row-gap 25px
  justify-items center
  & .errorTitle
    font-size alertFontSize
    font-weight 700
    color normalText
  & .errorMessage
    font-size messageFontSize
    font-weight 500
    color rgba(94, 94, 94, 1)
  & .buttonError
    mixin-buttons()

.enable-favoritos
  background-color normalButton
  &:active
    background-color pressedButton

.disable-favoritos
  background-color disabledcolor
  cursor: (not-allowed);
</style>

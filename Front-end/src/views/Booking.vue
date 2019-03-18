<template>
  <article id="booking">
    <h2>Click on  the artwork for more info</h2>
    <section class="search">
      <input class="inputsearch" type="text" v-model="search" placeholder="Search for Artwork">
    </section>
    <artworkItem v-for="artwork in filterArtwork" :key="artwork.id" :artwork="artwork"/>
  </article>
</template>

<script>
import artworkItem from "@/components/artworkItem";
export default {
  name: "artworks",
  data() {
    return {
      artwork: [],
      search: ""
    };
  },
  components: {
    artworkItem
  },
  computed: {
    artworks() {
      return this.$store.state.artworks;
    },
    filterArtwork: function() {
      return this.artworks.filter(artwork => {
        return artwork.title.toLowerCase().match(this.search.toLowerCase());
      });
    }
  }
};
</script>

<style lang="scss">
@import "../scss/main.scss";
#booking {
  input {
    font-size: 1.1rem;
    padding: 0.5rem 1rem;
    color: rgb(255, 255, 255);
    background-color: rgb(29, 29, 29);
    border: none;
    border-radius: 10px;

    &:focus {
      outline: none;
    }
  }
  .search {
    margin: 1.3rem;
  }
  h2 {
    font-size: 1.5rem;
    padding: 0 1rem;
    margin: 0;
  }
}
</style>










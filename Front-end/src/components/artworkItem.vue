<template>
  <div id="media">
    <section>
      <img
        class="media-object"
        :src="getImgUrl(artwork)"
        v-bind:alt="artwork.title"
        @click="seen = !seen"
      >
    </section>

    <section class="media-body" v-if="seen">
      <h3 class="media-heading">Title: {{artwork.title}}</h3>
      <p class="media-p">
        Artist: {{artwork.artist}}
        <br>
        Price: {{artwork.price}}:- /day
        <br>
        Description: {{artwork.description}}
      </p>
      <div class="buybutton" @click="selectArtwork(artwork)">Rent this artwork</div>
    </section>
  </div>
</template>

<script>
export default {
  name: "artwork",
  props: ["artwork"],
  data() {
    //toogle to se more info
    return { seen: false };
  },
  computed: {
    artworks() {
      return this.$store.state.artworks;
    }
  },
  methods: {
    //when you click on book, sending artwork to next page and rederict to book.
    selectArtwork(artwork) {
      this.$store.commit("selectArtwork", artwork);
      this.$router.push("/book");
    },
    //return method to get imgURL
    getImgUrl(artwork) {
      return this.artwork.artworkUrl;
    }
  }
};
</script>

<style lang="scss">
#media {
  max-width: 620px;
  color: black;
  margin: 0 auto;
  margin-bottom: 10px;
  box-shadow: 12px 0px 43px 2px #0ff;
  background: rgb(36, 36, 36);
  cursor: pointer;

  .media-object {
    width: 90%;
    padding: 1rem;
  }
  .media-body {
    padding: 0 0 5% 7%;
    width: 80%;
    color: white;
  }
  .media-heading {
    color: white;
    margin: 0 0 0.5em;
  }
}
</style>


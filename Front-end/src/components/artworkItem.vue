<template>
  <div class="media">
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
        Price: {{artwork.price}}:-
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
    return { seen: false };
  },
  computed: {
    artworks() {
      return this.$store.state.artworks;
    }
  },
  methods: {
    selectArtwork(artwork) {
      this.$store.commit("selectArtwork", artwork);
      this.$router.push("/buy");
    },
    getImgUrl(artwork) {
      return this.artwork.artworkUrl;
    }
  }
};
</script>

<style lang="scss">
.media {
  max-width: 620px;
  background: rgb(59, 59, 59);
  border-radius: 10px;
  color: black;
  text-align: left;
  margin: 0 auto;
  margin-bottom: 10px;

  .media-object {
    width: 90%;
    padding: 5% 0 4% 5%;
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


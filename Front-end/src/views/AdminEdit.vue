<template>
  <main id="adminedit">
    <h2>Edit Artwork</h2>

    <section class="contentEdit" v-if="artwork">
      <h3>{{ artwork.title }}</h3>
      <p class="artist">
        Artist: {{ artwork.artist }}
        <br>
      </p>
      <p class="description">
        <img class="media-object" v-bind:src="artwork.artworkUrl" width="300px">
      </p>

      <section class="editArt">
        <input type="text" v-model="artwork.title">
        <input type="text" v-model="artwork.artist">
        <input type="text" v-model="artwork.price">
        <input type="text" v-model="artwork.description">
        <input type="text" v-model="artwork.artworkUrl">
        <a href="#" class="btnAddArt" @click="sendEditArtwork">Edit Artwork</a>
      </section>
    </section>
  </main>
</template>

<script>
export default {
  name: "buy",

  computed: {
    artwork() {
      return this.$store.state.artwork;
    }
  },
  methods: {
    async sendEditArtwork(artwork, id) {
      this.$store.dispatch("sendEditArtwork", this.artwork);
      this.$router.push("/admin");
    }
  }
};
</script>

<style lang="scss">
@import "../scss/main";

.contentEdit {
  @extend %center;
  flex-direction: column;
  background: rgba(33, 2, 43, 0.7);
  width: 50%;
  margin: 0 auto;
  padding: 10px;
  font-size: 1.3rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
  color: black;
}

.editArt {
  width: 50%;
  margin: 0 auto;
  margin-bottom: 1rem;
  display: grid;
  padding: 2rem;
  margin-top: -10px;
}

#adminedit input {
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  color: black;
  background-color: #dcffff;
  border: none;
  border-radius: 100px;
  margin-top: 1rem;
}

.artist {
  margin: 0;
}

@media only screen and (max-width: 400px) {
  .contentEdit {
    width: 80%;
  }
  .editArt {
    width: 80%;
  }
}
</style>
<template>
  <div class="media-body1">
    <h3 class="media-heading">Title: {{artwork.title}}</h3>
    <p class="media-p">
      Artist: {{artwork.artist}}
      <br>
      Price: {{artwork.price}}:-
      <br>
      Description: {{artwork.description}}
    </p>
       
      <div class="buybutton" @click="selectArtwork(artworkInfo)">Rent this artwork</div>

  </div>
</template>

<script>
export default {
  name: "artworkinfo",
  prop: ["artworkinfo"],
  computed: {
    artwork() {
      return this.$store.state.artwork;
    }
  }
};
</script>

<style lang="scss">
@import '../scss/components';

.media-body1 {
  flex: 1;
  background: rgb(142, 135, 226);
}
.media-heading {
  margin: 0 0 0.5em;
}
.media-p {
  max-width: 100%;
}
</style>

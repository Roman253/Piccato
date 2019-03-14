<template>
  <div class="media">
    <img class="media-object" :src="url" />
    <p>{{artwork.title}}</p>
    <artworkDesc
      class="artworksDesc"
      v-for="artwork in artworkDesc"
     
      :key="artwork.id"
      :artwork="artwork"
    />
  </div>
</template>

<script>
// @click="$router.push(`/artworkItem/${artwork.id}/artworkDesc/${artworkDesc.id}`)"
export default {
  name: "artwork",
  props: ["artwork"], 
  data: {
    url : this.$store.state.artworks.artwork
  },      

  methods: {
    selectArtwork(artwork) {
      this.$store.commit("selectArtwork", artwork);
      //this.$router.push('/buy');
    }
  }
};
</script>

<style>
.media {
  display: flex;
  align-items: flex-start;
  background: #f6f3eb;
  padding: 1em;
  border-radius: 10px;
  color: black;
  width: 40%;
  text-align: left;
  margin: 0 auto;
  margin-bottom: 10px;
}
.media-object {
  margin: 1em;
  width: 100%;
}
</style>

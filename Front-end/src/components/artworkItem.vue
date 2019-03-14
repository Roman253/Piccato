<template>
  <div class="media">
    <img
      class="media-object"
      :src="getImgUrl(artwork)"
      v-bind:alt="artwork.title"
      @click="$router.push(`/artworkItem/${artwork._id}/artworkDesc/`)"
    >
    <router-view/>
  </div>
</template>

<script>
import artworkDesc from "@/components/artworkDesc";

export default {
  name: "artwork",
  props: ['artwork'],
  methods: {
    selectArtwork(artwork) {
      //this.$store.commit("selectArtwork", artwork);
    },
    getImgUrl(artwork) {
      //an if - if the img are Url ore in assets
      return this.artwork.artworkUrl;
      //return require('../assets/'+artwork.artworkUrl+".jpeg");
    }
  } 
  ,

  computed: {
    
    artworkInfo(){
      return this.$store.getters.artwork;
    }
    
  }

}
</script>

<style>
.media {
  display: flex;
  align-items: flex-start;
  background: #d9fbff;
  padding: 1em;
  border-radius: 10px;
  color: black;
  width: 40%;
  text-align: left;
  margin: 0 auto;
  margin-bottom: 10px;
}
.media-object {
  margin-right: 1em;
  width: 100%;
}
.media-body {
  flex: 1;
}
.media-heading {
  margin: 0 0 0.5em;
}
.media-p {
  max-width: 100%;
}
</style>


<template>
  <div class="media">
    <img
      class="media-object"
      :src="getImgUrl(artwork)"
      v-bind:alt="artwork.title"
      @click="showArtworkInfo(artworkInfo)"
    >
    <artworkinfo class="showArtInfo"/>
    <router-view/><br>
    <ul>
      <div class="buybutton" @click="selectArtwork(artworkInfo)">Rent this artwork</div>
    </ul>
  </div>
</template>

<script>
//, $router.push(`/booking/artworkItem/${artwork._id}`)
import artworkinfo from "@/components/artworkInfo";

export default {
  name: "artwork",
  props: ["artwork"],
  components: {
    artworkinfo
  },
  computed: {
    artworks() {
      return this.$store.state.artworks;
    },
    artworkInfo() {
      return this.$store.getters.getArtworkInfoById(this.$route.params.id)[0];
    }
  },
  methods: {
    selectArtwork(artwork) {
      this.$store.commit("selectArtwork", artwork);
      this.$router.push("/buy");
    },
    getImgUrl(artwork) {
      //an if - if the img are Url ore in assets
      return this.artwork.artworkUrl;
      //return require('../assets/'+artwork.artworkUrl+".jpeg");
    }, 
    showArtworkInfo(artworkInfo) {
      console.log('hej');
      showArtInfo:true;
    }
  }
};
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
  width: 80%;
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

.buybutton {
  background-color: #008ce6;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-family: "Avenir", sans-serif;
  padding: 5px 12px;
  color: #fff;
  cursor: pointer;
}

.buybutton:hover {
  background-color: rgb(36, 172, 196);
}
</style>


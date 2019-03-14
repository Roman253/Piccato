<template>
  <div class="media">
    <img class="media-object" v-bind:src="artwork.artworkUrl" width="200px">
    <div class="media-body">
      <h3 class="media-heading">Title: {{artwork.title}}</h3>
      <p class="media-p">Artist: {{artwork.artist}}<br>
      Price: {{artwork.price}}:- <br>
      Description: {{artwork.description}} <br>

            <ul><button class="buybutton" @click="selectArtwork(artwork)">Rent this artwork</button></ul>


      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'artwork',
  props: ['artwork'],  

  computed: {
    artworks() {
      return this.$store.state.artworks;
    }
  },


  methods: {
    selectArtwork(artwork) {
      this.$store.commit('selectArtwork', artwork);
      this.$router.push('/buy');
    },

  }
}
</script>

<style>
  .media {
    display: flex;
    align-items: flex-start;
    background: #D9FBFF;;
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
    width: 50%;
  }
  .media-body {
    flex: 1;
  }
  .media-heading {
    margin: 0 0 .5em;
  }
    .media-p {
    max-width: 100%;
  }

   .buybutton {
    background-color: #008ce6;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-family: 'Avenir', sans-serif;
    padding: 5px 12px;
    color: #fff;
    cursor: pointer;      
}

   .buybutton:hover {
    background-color: rgb(36, 172, 196);
      }



</style>

<template>
  <div class="media">
    <img class="media-object" src="../assets/cat1.jpeg">
    <div class="media-body">
      <h3 class="media-heading">Title: {{artwork.title}}</h3>
      <p class="media-p">Artist: {{artwork.artist}}<br>
      Price: {{artwork.price}}:- <br>
      Description: {{artwork.description}} 
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'artwork',
  props: ['artwork'],  

  methods: {
    selectArtwork(artwork) {
      this.$store.commit('selectArtwork', artwork);
      //this.$router.push('/buy');
    }
  }
}
</script>

<style>
  .media {
    display: flex;
    align-items: flex-start;
    background: #F6F3EB;
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
</style>

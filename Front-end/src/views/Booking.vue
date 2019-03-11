<template>
      <div class="booking">

<h2> Choose artwork to rent </h2>
 <artwork-item v-for="artwork in artwork-item" :key="artwork.id" :artwork="artwork"/>

<div class="media">
  <img class="media-object" src="../assets/cat1.jpeg">
  <div class="media-body">
    <h3 class="media-heading">Curious Cat</h3>
    <p class="media-p">Artist: <br>
    Price: 100:- <br>
    Description: 
    </p>
  </div>
</div>


<div class="media">
  <img class="media-object" src="../assets/cat1.jpeg">
  <div class="media-body">
    <h3 class="media-heading">Curious Cat</h3>
    <p class="media-p">Artist: <br>
    Price: 100:- <br>
    Description: 
    </p>
  </div>
</div>



<div class="media">
  <img class="media-object" src="../assets/cat1.jpeg">
  <div class="media-body">
    <h3 class="media-heading">Curious Cat</h3>
    <p class="media-p">Artist: <br>
    Price: 100:- <br>
    Description: 
    </p>
  </div>
</div>


</div>


</template>

<script>
import artworkItem from '@/components/artwork-item';

export default {
    name: 'artworks', 
    data() {
        return {
            artwork: []
        }
    }, 
    components: {
        artworkItem
    }, 
    computed: {
        artworks() {
            return this.$store.state.artworks;
        }
    }
}
</script>

<style lang="scss">
@import '../scss/main.scss';


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
    font-family: 'Homemade Apple', sans-serif;
  }
    .media-p {
    max-width: 100%;
  }


</style>



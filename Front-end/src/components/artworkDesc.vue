<template>
  <div class="media-body">
    <h3 class="media-heading">Title: {{artwork.title}}</h3>
    <p class="media-p">
      Artist: {{artwork.artist}}
      <br>
      Price: {{artwork.price}}:-
      <br>
      Description: {{artwork.description}}
    </p>
  </div>
</template>

<script>
export default {
    name:'desc',
    computed: {
        desc() {
            return this.$store.getters.getDescById(this.$route.params.descId);
        }
    }
};
</script>

<style>
.media-body {
  flex: 1;
  background: red;
}
.media-heading {
  margin: 0 0 0.5em;
}
.media-p {
  max-width: 100%;
}
</style>

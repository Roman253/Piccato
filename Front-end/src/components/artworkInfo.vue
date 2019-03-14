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
    <p>Button</p>
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

<style>
.media-body1 {
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

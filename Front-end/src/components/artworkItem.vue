<template>
  <div id="media">
    <section>
      <img
        class="media-object"
        :src="getImgUrl(artwork)"
        v-bind:alt="artwork.title"
        @click="seen = !seen"
      >
      <h3 class="media-heading">{{artwork.title}}</h3>
    </section>
    <transition appear name="fade" mode="in-out">
      <section class="media-body" v-if="seen">
        <p class="media-p">
          Artist: {{artwork.artist}}
          <br>
          Price: {{artwork.price}}:- /day
          <br>
          Description: {{artwork.description}}
        </p>
        <a class="btn" @click="selectArtwork(artwork)">Rent this artwork</a>
      </section>
    </transition>
  </div>
</template>

<script>
export default {
  name: "artwork",
  props: ["artwork"],
  data() {
    //toogle to se more info
    return { seen: false };
  },
  computed: {
    artworks() {
      return this.$store.state.artworks;
    }
  },
  methods: {
    //when you click on book, sending artwork to next page and rederict to book.
    selectArtwork(artwork) {
      this.$store.commit("selectArtwork", artwork);
      this.$router.push("/book");
    },
    //return method to get imgURL
    getImgUrl(artwork) {
      return this.artwork.artworkUrl;
    }
  }
};
</script>

<style lang="scss">
@import "../scss/variables";
@import "../scss/components";

#media {
  width: 50%;
  color: black;
  margin: 0 auto;
  margin-bottom: 1rem;
  box-shadow: 12px 0px 43px 2px #0ff;
  border-radius: 0.3rem;
  background-color: $DarkOrange;
  cursor: pointer;

  .media-object {
    width: 80%;
    margin-top: 1.5rem;
    border: 20px inset rgba(249, 161, 30, 0.555);
  }
  .media-body {
    padding: 0 0 5% 7%;
    width: 90%;
    color: white;
  }
  .media-heading {
    color: white;
    font-size: 3rem;
    padding: 0 0 1.5rem 0rem;
  }
}

@media only screen and (max-width: 600px) {
  #media {
    width: 80%;

    .media-object {
      width: 77%;
      margin-top: 1.5rem;
      border: 0.6rem inset rgba(249, 161, 30, 0.555);
    }

    .media-heading {
      font-size: 2rem;
    }
  }
}
</style>


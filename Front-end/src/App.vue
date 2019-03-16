<template>
  <div id="app">
    <login-bar></login-bar>
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/calendar">Calendar</router-link>
      <router-link to="/booking">Booking</router-link>
    </div>
    <transition appear name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import LoginBar from "./components/LoginBar.vue";
export default {
  name: "app",
  components: {
    loginBar: LoginBar
  },

  //before the page load this function connects to store and gets the API
  beforeMount() {
    this.$store.dispatch("getArtworks");
    this.$store.dispatch("setUser");
  },
  computed: {
    user() {
      return this.$store.state.activeUser;
    }
  }
};
</script>


<style lang="scss">
@import "./scss/main.scss";
@import "./scss/variables";
</style>

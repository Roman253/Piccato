<template>
  <div id="app">
    <login-bar alt="login"></login-bar>
    <transition appear name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import LoginBar from "./components/LoginBar.vue";
export default {
  name: "app",

  //instead of navBar an component to login and go to home
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

<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> 
      <router-link to="/calendar">Calendar</router-link> 
      <router-link to="/booking">Booking</router-link> 
      <router-link to="/user">User</router-link> 
      <router-link to="/admin">Admin</router-link> 



    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app', 

  //before the page load this function connects to store and gets the API
  beforeMount() {
    this.$store.dispatch('getArtworks')
  }
}
</script>


<style lang="scss">
@import './scss/main.scss';

</style>

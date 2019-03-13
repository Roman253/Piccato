<template>
      <main class="login">
        <article class="model">
          <figure>
          </figure>
          <input v-model="email" type="text" class="email" placeholder="email" :class="{ valid: validUsername, rejected : rejected}">
          <input v-model="password" type="password" placeholder="password" :class="{ valid: validPassword }">
          <a href="#" class="btn" @click="login" :class="{ ready: validPassword && validUsername }">Login</a>
        </article>
  </main>

</template>

<script>
export default {
    name: 'login',
    data(){
      return {
        email: '',
        password: '',
        validUsername: false,
        validPassword: false
      }
    },
    methods: {
      login(){
        if(this.validUsername && this.validPassword){

          this.$store.dispatch('login', {email: this.email, password: this.password});
        }
      }
    },
    watch: {
      email(val){
        if(val.length > 3 ){
          this.validUsername = true;
        } else {
          this.validUsername = false;
        }
      },
      password(val){
        if(val.length > 5){
          this.validPassword = true;
        } else {
          this.validPassword = false;
        }
      }
    },
    computed: {
        rejected(){
          return this.$store.state.rejected;
        }
    }
}

</script>

<style>

</style>

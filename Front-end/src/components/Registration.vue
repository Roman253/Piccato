<template>
  <transition name="fade" mode="out-in">
    <section class="registration">
      <h2>User Registration</h2>
      <input v-model="name" type="text" class="name" placeholder="Name">
      <input v-model="lastname" type="text" class="lastname" placeholder="Last name">
      <input v-model="email" type="email" class="email" placeholder="Email adress">
      <input v-model="password" type="password" class="password" placeholder="Password">
      <input
        v-model="confirm_password"
        type="password"
        class="password"
        placeholder="Confirm password"
      >
      <router-link class="login" to="/login">Already a member?Log in here</router-link>
      <a href="#" class="btn" @click="register">Register</a>
    </section>
  </transition>
</template>

<script>
export default {
  name: "registration",
  data() {
    return {
      name: "",
      lastname: "",
      email: "",
      password: "",
      confirm_password: "",
      role: "user"
    };
  },
  methods: {
    register() {
      this.$store.dispatch("register", {
        name: this.name,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
        confirm_password: this.confirm_password,
        role: this.role
      });
    }
  }
};
</script>

<style lang="scss">
@import "../scss/variables";

.registration {
  @extend %center;
  display: grid;
  grid-template-columns: 0.5fr;

  .btn {
    @extend %center;
    @extend %buttons;
  }

  input {
    @extend %inputs;
  }

  .login {
    @extend %center;
    text-decoration: none;
    font-size: 1.2rem;
    color: #fff;
    margin-top: 0.6rem;
  }
}
</style>

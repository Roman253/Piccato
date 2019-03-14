<template>
  <transition name="fade" mode="out-in">
    <main class="login">
      <section class="container">
        <h2>Log in</h2>
        <input
          v-model="email"
          type="text"
          class="email"
          placeholder="email"
          :class="{ valid: validUsername, rejected : rejected}"
        >
        <input
          v-model="password"
          type="password"
          placeholder="password"
          :class="{ valid: validPassword }"
        >
        <router-link class="register" to="/registration">Not a user? Register here</router-link>
        <a
          href="#"
          class="btn"
          @click="login"
          :class="{ ready: validPassword && validUsername }"
        >Login</a>
        <p v-show="this.checkForError">{{ getLoginError }}</p>
      </section>
    </main>
  </transition>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      validUsername: false,
      validPassword: false
    };
  },
  methods: {
    async login() {
      try {
        this.$store.dispatch("login", {
          email: this.email,
          password: this.password
        });
      } catch (err) {
        this.thereIsError = true;
        console.log(err);
      }
    }
  },
  watch: {
    email(val) {
      if (val.length > 4 && val.includes("@")) {
        this.validUsername = true;
      } else {
        this.validUsername = false;
      }
    },
    password(val) {
      if (val.length > 5) {
        this.validPassword = true;
      } else {
        this.validPassword = false;
      }
    }
  },
  computed: {
    rejected() {
      return this.$store.state.rejected;
    },
    getLoginError() {
      return this.$store.state.loginError;
    },
    checkForError() {
      return this.$store.state.thereIsError;
    }
  },
  destroyed: function() {
    this.$store.dispatch("deleteErrors");
  }
};
</script>

<style lang="scss">
@import "../scss/variables";

.login {
  @extend %center;

  .container {
    display: grid;
    grid-template-columns: 1fr;

    .btn {
      @extend %center;
      @extend %buttons;
    }

    input {
      @extend %inputs;
    }
  }

  .register {
    @extend %center;
    text-decoration: none;
    font-size: 1.2rem;
	color: #fff;
	margin-top: 0.6rem;
  }
}
</style>

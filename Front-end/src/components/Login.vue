<template>
  <transition name="fade" mode="out-in">
    <main class="login">
      <section class="container">
        <h2>Log in</h2>
        <p class="error" v-if="checkForError">{{ getLoginError }}</p>
        <h3 v-if="checkForRegSuccess">Registration succesful! Please log in:</h3>
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
        <section id="registerQuestion">
          <span id="notUser">Not a user?</span>
          <router-link class="register" to="/registration">Register here</router-link>
        </section>
        <a
          href="#"
          class="btn"
          @click="login"
          :class="{ ready: validPassword && validUsername }"
        >Login</a>
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
      validPassword: false,
      redirect: undefined
    };
  },
  methods: {
    async login() {
      await this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      });

      if ((await this.activeUser) == null) {
        if ((await this.checkForError) == false) {
          let userData = await JSON.parse(sessionStorage.getItem("userData"));

          if (userData.role == "user") {
            if (this.redirect == undefined) {
              await this.$router.push("/user");
              console.log("found USer");
            } else {
              console.log("found Redirect");
              this.$router.push(this.redirect);
            }
          } else {
            if (this.redirect == undefined) {
              await this.$router.push("/admin");
              console.log("found Admin");
            } else {
              console.log("found Redirect");
              this.$router.push(this.redirect);
            }
          }
        } else {
          console.log("error");
          this.$router.push("/login");
        }
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
    },
    checkForRegSuccess() {
      return this.$store.state.success;
    },
    getActiveUser() {
      return this.$store.state.activeUser;
    }
  },
  beforeUpdate() {
    this.getActiveUser;
    this.$store.dispatch("deleteErrors");
  },
  mounted: function() {
    if (sessionStorage.getItem("recentRegister")) {
      this.email += sessionStorage.getItem("recentRegister");
    }
    this.redirect = this.$route.query.redirect;
  },
  destroyed: function() {
    this.$store.dispatch("deleteErrors");
  },
  created() {}
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
    color: blue;
  }

  .error {
    color: $orange;
    font-weight: bold;
    margin: 0.6rem 0rem;
  }
  #notUser {
    pointer-events: none;
    margin-right: 0.2rem;
  }

  #registerQuestion {
    display: flex;
    justify-content: center;
    align-content: center;
    margin: 0.6rem 0rem;
    font-size: 1.3rem;
  }
}
</style>

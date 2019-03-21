<template>
  <section class="registration">
    <h2>User Registration</h2>
    <transition name="fade" mode="out-in">
      <p class="error" v-if="checkForError">{{ getLoginError[0].msg }}</p>
    </transition>
    <input v-model="name" type="text" :class="{valid: validName}" placeholder="Name">
    <input v-model="lastname" type="text" :class="{valid: validLastName}" placeholder="Last name">
    <input v-model="email" type="email" :class="{valid: validEmail}" placeholder="Email adress">
    <input
      v-model="password"
      type="password"
      :class="{valid: validPassword}"
      placeholder="Password"
    >
    <input
      v-model="confirm_password"
      type="password"
      :class="{valid: validConfirmPassword}"
      placeholder="Confirm password"
    >
    <section id="loginQuestion">
      <span>Already a member?</span>
      <router-link class="login" to="/login">Log in here</router-link>
    </section>
    <a href="#" class="btn" @click=" register">Register</a>
  </section>
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
      role: "user",
      validName: false,
      validLastName: false,
      validEmail: false,
      validPassword: false,
      validConfirmPassword: false
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
  },
  watch: {
    name(val) {
      if (val.length > 1) {
        this.validName = true;
      } else {
        this.validName = false;
      }
    },
    lastname(val) {
      if (val.length > 1) {
        this.validLastName = true;
      } else {
        this.validLastName = false;
      }
    },
    email(val) {
      if (val.length > 2 && val.includes("@") && val.includes(".")) {
        this.validEmail = true;
      } else {
        this.validEmail = false;
      }
    },
    password(val) {
      if (val.length > 4) {
        this.validPassword = true;
      } else {
        this.validPassword = false;
      }
    },
    confirm_password(val) {
      if (val.length > 4 && val === this.password) {
        this.validConfirmPassword = true;
      } else {
        this.validConfirmPassword = false;
      }
    }
  },
  computed: {
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

.registration {
  @extend %center;
  
  display: grid;
  grid-template-columns: 0.4fr;

  .btn {
    @extend %center;
    @extend %buttons;
  }

  .error {
    color: $orange;
    font-weight: bold;
    margin: 0rem 0rem 0.6rem;
  }

  input {
    @extend %inputs;
  }

  .login {
    @extend %center;
    text-decoration: none;
    color: blue;
  }

  #loginQuestion {
    display: flex;
    justify-content: center;
    align-content: center;
    margin: 0.6rem 0rem;
    font-size: 1.3rem;

    span {
      pointer-events: none;
      margin-right: 4px;
    }
  }

  @media only screen and (max-width: 780px) {
    #loginQuestion {
      display: flex;
      flex-direction: column;
      margin: 0.4rem 0rem;
    }
  }
}
</style>

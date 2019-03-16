<template>
  <transition appear name="fade" mode="in-out">
    <main id="main">
      <section class="content">
        <a href="#" v-if="this.getActiveUser" @click="checkUser" class="user">Logged in as:
          <span>{{ getActiveUser.email }}</span>
        </a>
        <a href="#" v-if="this.getActiveUser" class="btn" @click="logout">
          <img src="../assets/logout.svg">
        </a>
        <router-link v-if="!this.getActiveUser" to="/login">
          <img src="../assets/login.svg">
        </router-link>
      </section>
    </main>
  </transition>
</template>

<script>
import auth from "../auth.js";
export default {
  name: "loginbar",
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
    checkUser() {
      if (sessionStorage.getItem("isAdmin")) {
        this.$router.push("/admin");
      } else {
        this.$router.push("/user");
      }
    }
  },
  computed: {
    getActiveUser() {
      return this.$store.state.activeUser;
    }
  }
};
</script>


<style lang="scss">
@import "../scss/variables";

#main {
  .content {
    display: flex;
    justify-content: flex-end;

    a {
      text-decoration: none;
    }

    img {
      width: 2.1rem;
      margin: 0.3rem 1.4rem 0.1rem 0;
    }

    .user {
      margin: 0.6rem 0.8rem;
      font-weight: bold;
      color: black;
    }

    span {
      color: blue;
    }
  }
}

@media only screen and (max-width: 600px) {
  #main {
    .content {
      img {
        width: 2.1rem;
        margin: 0.3rem 0.4rem 0.1rem 0;
      }

      .user {
        font-weight: 700;
      }
    }
  }
}
</style>

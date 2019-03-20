<template>
  <transition appear name="fade" mode="in-out">
    <main id="main">
      <section class="homeContent">
        <router-link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c6/IdeaLab_space_cat.svg"
            alt="home"
            width="70px"
          >
        </router-link>
      </section>

      <section class="homeContentText">
        <a href="#">
         <router-link to="/">
          <h4>Piccato</h4>
          </router-link>
        </a>
      </section>

      <section class="content">
        <a href="#" v-if="this.getActiveUser" @click="checkUser" class="user">
          Logged in as:
          <span>{{ getActiveUser.email }}</span>
        </a>
        <a href="#" v-if="this.getActiveUser" @click="logout">
          <img src="../assets/logout.svg">
        </a>
        <router-link v-if="!this.getActiveUser" to="/login">
          <img src="../assets/login.svg" alt="Log in">
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
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 100px 50px 1fr;
  grid-template-areas: "homecontent text content";
  margin-left: 2rem;
  margin-top: 1rem;

  .homeContent {
    grid-area: homecontent;
  }



  .homeContentText {
    grid-area: text;
    justify-content: flex-end;

  }

  .content {
    display: flex;
    justify-content: flex-end;
    grid-area: content;
    margin-top: 1rem;

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
      color: white;
    }

    span {
      color: rgb(112, 210, 255);
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

    .homeContentText {
      display: none;
    }
  }
}
</style>

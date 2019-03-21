<template>
  <div id="hello">
    <section>
      <h1>Piccato</h1>
    </section>
    <section class="logo">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/c6/IdeaLab_space_cat.svg"
        alt="logo"
        width="200px"
      >
    </section>
    <section class="bookedart">
      <div class="infotxt">
        <p>Make your workers happy.
          <br>This is Piccato, where you can rent artwork of cats.
          <br>Login to rent our art today.
        </p>
      </div>

      <a href="#" @click="$router.push('/booking')" class="btn">
        <h2>Rent an artwork!</h2>
      </a>
      <a href="#" @click="$router.push('/user')" v-if="this.activeUser" class="btn">
        <h2>Your booked artwork!</h2>
      </a>
    </section>
  </div>
</template>

<script>
export default {
  name: "home",
  computed: {
    activeUser() {
      return this.$store.state.activeUser;
    }
  },
  mounted() {
    this.activeUser;
  }
};
</script>

<style lang="scss">
@import "../scss/main.scss";
@import "../scss/components.scss";

#hello {
  display: grid;
  height: 100%;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  justify-content: center;
  filter: drop-shadow(0 0 0.75rem rgba(12, 12, 12, 0.507));

  .bookedart {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  section {
    &:last-child {
      margin-bottom: 1rem;
    }

    img {
      border-radius: 10px;
    }

    h2 {
      font-size: 1.6rem;
      font-weight: lighter;
    }

    p {
      text-align: center;
      filter: drop-shadow(0 0 0.75rem rgba(12, 12, 12, 0.507));
    }
    .btn {
      width: 100%;
    }
  }

  .logo {
    filter: drop-shadow(0 0 0.75rem rgba(12, 12, 12, 0.507));
  }

  @media only screen and (max-width: 600px) {
    .bookedart {
      .btn {
        width: 50%;
      }
    }
  }
}
</style>

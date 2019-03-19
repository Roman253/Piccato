<template>
  <article id="user">
    <h2>Welcome {{ getActiveUser.name }}</h2>
     <a href="#" class="btn" @click="$router.push('/booking')">Rent a artwork</a>

    <h3>Manage your bookings</h3>

    <section class="artworklist">
      <table cellspacing="0">
        <thead>
          <tr>
            <th>Artwork</th>
            <th>Dates booked</th>
            <th>Cancel booking</th>
          </tr>
        </thead>
        <!-- Import bookings from DB -->
        <tbody>
          <tr v-for="artwork in artworks" :key="artwork._title" :artwork="artwork">
            <td>{{artwork.title}}</td>
            <td>{{artwork.artist}}</td>
            <td>
              <button @click="artwork; deleteBooking()">X</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    <a href="#" class="btn" @click="logout">Logout</a>
  </article>
</template>

<script>
export default {
  name: "bookings",
  props: ["bookings"],
  beforeMount() {
    this.$store.dispatch("getArtworks");
  },

  data() {
    return {
      artwork: []
      
    };
  },

  computed: {
    artworks() {
      return this.$store.state.artwork;
    },
    getActiveUser() {
      return this.$store.state.activeUser;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    }
  },
  deleteBooking() {
    this.$store.dispatch("deleteBooking", this.artwork);
  }
};
</script>

<style lang="scss">
@import "../scss/main.scss";
@import "../scss/components.scss";

#user {
  display: grid;
  grid-template-columns: 1.5fr;

  .btn {
    margin: auto;
    width: 9rem;
    margin-top: 2rem;
    @extend %center;
   // @extend %buttons;
  }

  h2 {
    font-size: 2rem;
    margin: 0;
  }
  .artworklist {
    background-image:linear-gradient(rgb(47, 248, 248), rgb(91, 217, 255));
    border-radius: 10px;
    padding: 1rem;
    color: black;
    width: 50%;
    margin: 0 auto;
  }

  table {
    width: 100%;

    thead {
      tr {
        color: rgb(101, 90, 255);
        text-transform: uppercase;

        th {
          border-bottom: 1px solid #fff;
          padding: 0.5rem 0;
        }
      }
    }

    tbody {
      tr {
        td {
          color: black;
          padding: 1rem 0;
          font-size: 1rem;
          border-bottom: 1px solid rgb(30, 192, 232);
        }
      }
    }
  }

  @media only screen and (max-width: 400px) {
    .artworklist {
      width: 100%;
    }

    table {
      font-size: 0.7rem;
      text-align: left;
    }

    td {
      font-size: 0.5rem;
    }
  }
}
</style>



<template>
  <article id="admin">
    <h2>Welcome {{ getActiveUser.name }}</h2>
    <h2 class="message" v-if="this.success">Booking successfully created!</h2>
    <h3>Manage Artworks</h3>
    <section class="artworklist">
      <table cellspacing="0">
        <thead>
          <tr>
            <th>Artwork</th>
            <th>Delete Artwork</th>
            <th>Edit Artwork</th>
          </tr>
        </thead>
        <!-- Import artworks from DB -->
        <tbody>
          <tr v-for="artwork in artworks" :key="artwork._id" :artwork="artwork">
            <td>{{artwork.title}}</td>
            <td>{{artwork.artist}}</td>
            <td>
              <div id="btnRemove" @click="deleteArtwork(artwork, artwork._id)">X</div>
            </td>
            <td>
              <div id="btnEditArt" @click="selectArtwork(artwork)">Edit</div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <h3>Manage User bookings</h3>

    <section class="artworklist">
      <table cellspacing="0">
        <thead>
          <tr>
            <th>User Email</th>
            <th>Dates (Start, End)</th>
            <th>Delete booking</th>
          </tr>
        </thead>
        <!-- Import bookings from DB -->
        <tbody>
          <tr v-for="booking in bookings" :key="booking._id" :booking="booking">
            <td>{{booking.user.email}}</td>
            <td>
              {{booking.selectedDate.start.substring(0,10)}}
              <span>-</span>
              {{booking.selectedDate.end.substring(0,10)}}
            </td>
            <td>
              <div id="btnRemove" @click="deleteBooking(booking, booking._id)">X</div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

   <!-- Add new Artwork to DB -->

    <section class="addArt">
      <h3>Add new Artwork</h3>
      <br>
      <section class="form">
        <input type="text" placeholder="Title" v-model="newArtwork.title">
        <input type="text" placeholder="Artist" v-model="newArtwork.artist">
        <input type="text" placeholder="Price" v-model="newArtwork.price">
        <input type="text" placeholder="Description" v-model="newArtwork.description">
        <input type="text" placeholder="Image URL" v-model="newArtwork.artworkUrl">
        
        <a href="#" class="btnAddArt" @click="createArtwork">Add Artwork</a>
      </section>
    </section>
  </article>
</template>

<script>
export default {
  name: "admin",
  data() {
    return {
      artwork: [],
      search: "",
      newArtwork: {
        title: "",
        artworkUrl: "",
        artist: "",
        price: "",
        description: ""
      },
      success: false
    };
  },

  methods: {
    async createArtwork() {
      this.$store.dispatch("createArtwork", this.newArtwork);
      this.$store.dispatch("getArtworks");
    },

    selectArtwork(artwork) {
      this.$store.commit("selectArtwork", artwork);
      this.$router.push("/adminedit");
    },

    async deleteArtwork(id) {
      await this.$store.dispatch("deleteArtwork", id);
      await this.$store.dispatch("getArtworks");
    },
    async deleteBooking(id) {
      this.$store.dispatch("deleteBooking", id);
      await this.$store.dispatch("getBookings");
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    }
  },

  computed: {
    artworks() {
      return this.$store.state.artworks;
    },
    bookings() {
      return this.$store.state.bookings;
    },
    getActiveUser() {
      return this.$store.state.activeUser;
    }
  },
  async beforeMount() {
    await this.$store.dispatch("getArtworks");
    await this.$store.dispatch("getBookings");
  },
  mounted() {
    this.success = this.$route.query.success;
  },
  destroyed() {
    this.success = false;
  }
};
</script>

<style lang="scss">
@import "../scss/main.scss";
#admin {
  width: 100%;
  filter: drop-shadow(0 0 1rem black);
  .addArt {
    width: 50%;
    margin: 0 auto;
    margin-bottom: 1rem;
    color: rgb(101, 90, 255);
  }

  #btnRemove,
  #btnEditArt {
    color: white;
    background: #a20000;
    border-radius: 10px;
    display: inline;
    padding: 0px 10px 0px 10px;
    cursor: pointer;
  }

  #btnEditArt {
    background: #8400ff;
  }

  .form {
    width: auto;
    display: grid;
    background: rgba(33, 2, 43, 0.8);
    padding: 1.3rem;

    input {
      height: 2rem;
      margin: 0.4rem;
      font-size: 1.1rem;
      font-family: "Sniglet", cursive;
      padding: 0.5rem;
    }
  }

  #admin input {
    font-size: 1.1rem;
    padding: 0.5rem 1rem;
    color: black;
    background-color: #dcffff;
    border: none;
    border-radius: 100px;
    margin-top: 1rem;
  }

  .btnAddArt {
    height: 2rem;
    padding: 10px 0px -5px 0px;
    margin: 4px 0;
    margin-top: 1rem;
    border: none;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #fff;
    font-size: 21px;
    font-family: "Merienda One", sans-serif;
    background: #31578f;
    text-decoration: none;
    cursor: pointer;
  }
  .btnAddArt:hover {
    background-color: rgb(121, 231, 250);
  }

  .artworklist {
    background: rgba(33, 2, 43, 0.8);
    border-radius: 3px;
    padding: 1rem;
    color: white;
    width: 50%;
    margin: 0 auto;
  }

  .message {
    color: $green;
    font-size: 2.3rem;
  }

  h2 {
    font-size: 2.5rem;
    color: $orange;
    filter: drop-shadow(0 0 1rem black);
  }

  h3 {
    font-size: 1.8rem;
  }

  table {
    width: 100%;

    thead {
      tr {
        color: rgb(166, 160, 255);
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
          color: white;
          padding: 1rem 0;
          font-size: 1rem;
          border-bottom: 1px solid rgb(30, 192, 232);
        }
      }
    }
  }
}

@media only screen and (max-width: 400px) {
  #admin {
    .addArt,
    .artworklist {
      width: 80%;
    }

    table {
      width: 100%;

      thead {
        tr {
          color: rgb(166, 160, 255);
          text-transform: uppercase;

          th {
            width: auto;
            border-bottom: 1px solid #fff;
            padding: 0.5rem 0;
            font-size: 0.8rem;
          }
        }
      }

      tbody {
        width: 60%;
        tr {
          td {
            color: white;
            padding: 1rem 0;
            font-size: 1rem;
            border-bottom: 1px solid rgb(30, 192, 232);
          }
        }
      }
    }

    .form {
      width: auto;

      input {
        height: 2rem;
        margin: 0.4rem;
        font-size: 1.2rem;
        font-family: "Sniglet", cursive;
        padding: 0.5rem;
      }
    }

    h2 {
      font-size: 2.4rem;
    }
  }
}
</style>



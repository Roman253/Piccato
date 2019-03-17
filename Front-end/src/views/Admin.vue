<template>
  <article id="admin">
    <h2>Welcome {{ getActiveUser.name }}</h2>

    <h3>Manage bookings</h3>
    <section class="artworklist">
      <table cellspacing="0">
        <thead>
          <tr>
            <th>Artwork</th>
            <th>Dates booked</th>
            <th>Cancel booking</th>
          </tr>
        </thead>
        <!-- Import artworks from DB -->
        <tbody>
          <tr v-for="artwork in artworks" :key="artwork._title" :artwork="artwork">
            <td>{{artwork.title}}</td>
            <td>{{artwork.artist}}</td>
            <td>
              <button @click="deleteArtwork(artwork, artwork._id)">X</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <h3>Manage Artworks</h3>
    <section class="artworklist">
      <table cellspacing="0">
        <thead>
          <tr>
            <th>Artwork</th>
            <th>Remove Artwork</th>
          </tr>
        </thead>
        <!-- Import artworks from DB -->
        <tbody>
          <tr v-for="artwork in artworks" :key="artwork._title" :artwork="artwork">
            <td>{{artwork.title}}</td>
            <td>
              <button @click="deleteArtwork(artwork._id)">X</button>
            </td>
          </tr>
        </tbody>
      </table>

      <a href="#" class="btn" @click="logout">Logout</a>
    </section>

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
  name: "artworks",
  props: ["artwork"],
  name: "admin",
  beforeMount() {
    this.$store.dispatch("getArtworks");
  },

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
      }
    };
  },

  methods: {
    async createArtwork() {
      this.$store.dispatch("createArtwork", this.newArtwork);
      this.$store.dispatch("getArtworks");
    },

    async deleteArtwork(id) {
      this.$store.dispatch("deleteArtwork", id);
      await this.$store.dispatch("getArtworks");
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
    filterArtwork: function() {
      return this.artworks.filter(artwork => {
        return artwork.title.toLowerCase().match(this.search.toLowerCase());
      });
    },
    getActiveUser() {
      return this.$store.state.activeUser;
    }
  }
};
</script>

<style lang="scss">
@import "../scss/main.scss";

.addArt {
  width: 50%;
  margin: 0 auto;
}

.form {
  display: grid;
  background: rgb(91, 217, 255);
  padding: 2rem;
  margin-top: -10px;
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
  background: rgb(91, 217, 255);
  border-radius: 3px;
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
  .addArt,
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
</style>



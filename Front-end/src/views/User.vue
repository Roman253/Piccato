<template>
  <article id="user">
    <h2>Welcome {{ getActiveUser.name }}</h2>
    <h2 class="message" v-if="this.success">Booking successfully created!</h2>
    <h3>Manage bookings</h3>
    <section class="artworklist">
      <table cellspacing="0">
        <thead>
          <tr>
            <th>Artwork ID</th>
            <th>Booked To-From</th>
            <th>Delete booking</th>
          </tr>
        </thead>
        <!-- Import artworks from DB -->
        <tbody>
          <tr v-for="booking in bookings" :key="booking._id" :booking="booking">
            <td>{{booking.artwork.title}}</td>
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
  </article>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      success: false
    };
  },
  methods: {
    async deleteBooking(id) {
      await this.$store.dispatch("deleteBooking", id);
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
  mounted() {
    this.success = this.$route.query.success;
 
  },
  destroyed() {
    this.success = false;
  },
  async beforeMount() {
    await this.$store.dispatch("getArtworks");
    await this.$store.dispatch("getBookings");
  },
};
</script>

<style lang="scss">
@import "../scss/main.scss";
@import "../scss/variables";

#user {
  padding-bottom: 3rem;
  #btnRemove {
    color: white;
    background: #a20000;
    border-radius: 10px;
    display: inline;
    padding: 0px 10px 0px 10px;
    cursor: pointer;
  }

  .artworklist {
    background: rgba(33, 2, 43, 0.8);
    border-radius: 3px;
    padding: 1rem;
    color: white;
    width: 50%;
    margin: 0 auto;
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
}

@media only screen and (max-width: 600px) {
  #user {
    .artworklist {
      width: 85%;
    }

    table {
      font-size: 0.7rem;
      text-align: left;
    }

    td {
      font-size: 0.5rem;
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
}
</style>



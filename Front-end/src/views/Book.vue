<template>
  <main id="buy">
    <section @mouseover="nrOfDates" class="wrapperBuy">
      <section @mouseover="getEvent" class="contentBuy" v-if="artwork">
        <h3>Choose number of days</h3>
        <calendar class="calendar" alt="calendar"></calendar>
        <div class="media">
          <img class="media-object" v-bind:src="artwork.artworkUrl" width="200px">
          <div class="media-body">
            <h3 class="media-heading">Title: {{artwork.title}}</h3>
            <p class="media-p">
              Artist: {{artwork.artist}}
              <br>
              Price: {{artwork.price}}:-/day
              <br>
              Description: {{artwork.description}}
              <br>
            </p>
          </div>
        </div>
        <p>Chosen number of days: {{amount}}</p>
        <p>Your total price: {{ artwork.price * amount }} SEK</p>
        <a href="#" v-if="this.selectedDate" class="btn" @click="bookArtwork">Book Artwork</a>
      </section>
    </section>
  </main>
</template>

<script>
import Calendar from "../components/Calendar.vue";
import EventBus from "../event-bus";
export default {
  name: "book",
  components: {
    calendar: Calendar
  },
  data() {
    return {
      amount: null,
      selectedDate: null,
      failPost: false
    };
  },
  computed: {
    artwork() {
      return this.$store.state.artwork;
    },
    activeUser() {
      return this.$store.state.activeUser;
    },
    getDates() {
      return Calendar.data.selectedDate;
    }
  },
  methods: {
    bookArtwork() {
      if (this.activeUser) {
        this.$store.dispatch("bookArtwork", {
          artwork: this.artwork,
          user: this.activeUser,
          selectedDate: this.selectedDate
        });
      this.$router.push({ path: "/user", query: { success: "true" } });
      } else {
        this.$router.push({ path: "/login", query: { redirect: "/book" } });
      }
    },
    nrOfDates() {
      if (this.selectedDate !== null) {
        let diff = this.selectedDate.end - this.selectedDate.start;
        let amount = Math.round(diff / 86400000);
        this.amount = amount;
      }
    },
    getEvent() {
      EventBus.$on("selectedDates", payload => {
        this.selectedDate = payload;
      });
      this.nrOfDates;
    }
  }
};
</script>

<style lang="scss">
@import "../scss/main";
@import "../scss/components";

#buy {
  width: 100%;
  p {
    margin: 0.4rem;
  }
  .buybutton {
    padding: 0.8rem 1rem;
    margin-bottom: 1rem;
  }
  .media {
    display: flex;
    align-items: flex-start;
    background-color: $orange;
    padding: 1em;
    border-radius: 10px;
    color: black;
    width: 72%;
    text-align: left;
    margin: 1rem auto;
    p {
      color: black;
    }
  }
  .media-object {
    margin-right: 1rem;
    border: rgb(59, 59, 59) solid 5px;
    width: 60%;
  }
  .media-body {
    width: 40%;
    color: black;
  }
  .media-heading {
    margin: 1rem 0 0.5em;
    font-size: 1rem;
    color: black;
  }

  .contentBuy {
    @extend %center;
    flex-direction: column;
    background: $DarkOrange;
    width: 60%;
    margin: 0 auto;
    padding: 10px;
    font-size: 1.3rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
    color: black;
  }

  .btn {
    color: white;
  }

  calendar {
    width: 100%;
  }

  .popover-container[data-v-1ad2436f] {
    margin: 0 auto;
  }

  @media only screen and (max-width: 400px) {
    .contentBuy {
      width: 80%;
    }

    .media {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: $orange;

      img {
        width: 90%;
      }

      .media-object {
        width: 60%;
      }
      .media-body {
        width: 100%;
      }
      .media-heading {
        width: 100%;
        font-size: 1.4rem;
      }
    }
  }
}
</style>
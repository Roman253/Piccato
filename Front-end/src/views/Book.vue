<template>
  <main id="buy">
    <section class="contentBuy" v-if="artwork">
      <h3>Choose number of days</h3>
      <calendar alt="calendar"></calendar>
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

      <div class="buybutton" @click="nrOfDates()">
        <p>Calculate the price</p>
      </div>
      <p>Chosen number of days: {{amount}}</p>
      <article class="price">Your total price: {{ artwork.price * amount }} sek</article>
      <br>
      <a href="#" class="btnbuy" @click="bookArtwork">Confirm</a>
    </section>

    <section class="content" v-if="!artwork">
      <p>No dates selected.</p>
      <a href="#" class="btn" @click="buy">Go to artwork list</a>
    </section>
  </main>
</template>

<script>
import Calendar from "../components/Calendar.vue";
export default {
  name: "buy",
  components: {
    calendar: Calendar
  },
  data() {
    return {
      amount: 0,
      selectedDate: {
        start: new Date(),
        end: new Date()
      }
    };
  },
  computed: {
    artwork() {
      return this.$store.state.artwork;
    },
    activeUser() {
      return this.$store.state.activeUser;
    }
  },
  methods: {
    bookArtwork() {
      if (this.activeUser) {
        this.$store.dispatch("bookArtwork", {
          artworkID: this.artwork._id,
          userUID: this.activeUser.uid,
          selectedDate: this.selectedDate
        });
        console.log("Success!");
      } else {
        this.$router.push({ name: "login", query: { redirect: "/book" } });
      }
    },

    nrOfDates() {
      let diff = this.selectedDate.end - this.selectedDate.start;
      let amount = Math.round(diff / 86400000);
      this.amount = amount;
    }
  }
};
</script>

<!-- -->
<style lang="scss">
@import "../scss/main";
@import "../scss/components";

#buy {
  .media {
    display: flex;
    align-items: flex-start;
    background: #d9fbff;
    padding: 1em;
    border-radius: 10px;
    color: black;
    width: 80%;
    text-align: left;
    margin: 0 auto;
    margin-bottom: 10px;
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
    background-color: #5bd9ff;
    width: 80%;
    margin: 0 auto;
    padding: 10px;
    font-size: 1.3rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
    color: black;
  }

  .btnbuy {
    background-color: rgb(0, 30, 162);
    padding: 5px 16px 10px 16px;
    color: white;
    text-decoration: none;
    font-size: 1.2rem;
    margin-top: 20px;
    border-radius: 5px;
  }

  .btnbuy:hover {
    background-color: rgb(9, 126, 126);
  }

  .calendarDate {
    margin: 0 auto;
    margin-bottom: 300px;
    margin-left: 35%;
  }

  .popover-container[data-v-1ad2436f] {
    margin: 0 auto;
  }

  @media only screen and (max-width: 400px) {
    .contentBuy {
      width: 80%;
    }
  }
}
</style>
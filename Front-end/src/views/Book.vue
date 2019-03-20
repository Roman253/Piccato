<template>
  <main id="buy" >
    <section @mouseover="nrOfDates" class="wrapperBuy">
      <section @mouseover="getEvent" class="contentBuy" v-if="artwork">
        <h3>Choose number of days</h3>
        <calendar   class="calendar" alt="calendar"></calendar>
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
      <a href="#" class="btnbuy" @click="bookArtwork">Confirm</a>
    </section>

    </section>
  </main>
</template>

<script>
import Calendar from "../components/Calendar.vue";
import EventBus from '../event-bus';
export default {
  name: "book",
  components: {
    calendar: Calendar
  },
  data() {
    return {
      amount: null,
      selectedDate: null
    }
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
      } else {
        this.$router.push({ name: "login", query: { redirect: "/book" } });
      }
    },
    nrOfDates() {
      if(this.selectedDate !== null){
      let diff = this.selectedDate.end - this.selectedDate.start;
      let amount = Math.round(diff / 86400000);
      this.amount = amount;
      }

    },
    getEvent(){
      EventBus.$on('selectedDates', payload => {
        this.selectedDate = payload;
  
      });
      this.nrOfDates;
    }
  },
    beforeUpdate () {
    

    console.log('Updated');
  }
};
</script>

<style lang="scss">
@import "../scss/main";
@import "../scss/components";

#buy {
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
    background: #d9fbff;
    padding: 1em;
    border-radius: 10px;
    color: black;
    width: 80%;
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
    background: rgb(33, 2, 43);
    width: 80%;
    margin: 0 auto;
    padding: 10px;
    font-size: 1.3rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
    color: black;
  }

  .btnbuy {
    background-color: rgba(48, 46, 151, 0.493);
    padding: 0.8rem 2.8rem;
    color: white;
    text-decoration: none;
    font-size: 1.2rem;
    margin-top: 20px;
    border-radius: 5px;
    border: 2px solid white;
  }

  .btnbuy:hover {
    background-color: rgb(9, 126, 126);
  }

  calendar {
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
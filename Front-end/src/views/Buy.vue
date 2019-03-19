<template>
  <main id="buy">
    <h2>Booking</h2>

    <section class="contentBuy" v-if="artwork">
      <h3>Choose number of days</h3>

      <div class="calendarDate">
       <button class="search-btn" v-on:click="search"> Console dates </button>

        <v-date-picker mode="range" v-model="selectedDate" :min-date="new Date()" show-caps></v-date-picker>
      </div>

      <h3>{{ artwork.title }}</h3>
      <p class="artist">
        Artist: {{ artwork.artist }}
        <br>
      </p>
      <p class="description">
        <img class="media-object" v-bind:src="artwork.artworkUrl" width="300px">
        <br>
        Description: {{artwork.description}}
      </p>
      <article class="price">Price per day: {{ artwork.price }} sek</article>
      <br>
      <article class="price">Your total price: {{ artwork.price * amount }} sek</article>
      <br>

      <section class="counter">
        <article class="decrease" @click=" amount--" v-show="amount > 1">-</article>
        <article class="num-days">{{ amount }}</article>
        <article class="increase" @click=" amount++ ">+</article>
      </section>
      <a href="#" class="btnbuy" @click="buy">Confirm</a>
    </section>
    <section class="content" v-if="!artwork">
      <p>No dates selected.</p>
      <a href="#" class="btn" @click="$router.push('/booking')">Go to artwork list</a>
    </section>
  </main>
</template>

<script>
export default {
  name: "buy",
  data() {
    return {
      amount: 1,
      selectedValue: new Date(),

      selectedDate: {
        start: new Date(),
        end: new Date()
      }
    };
  },
  computed: {
    artwork() {
      return this.$store.state.artwork;
    }
  },
  methods: {
    buy() {
      this.$store.dispatch("buy", {
        artwork: this.artwork._id,
        amount: this.amount
      });
      this.$router.push("/user");
    },

   search: function () {
   console.log(this.selectedDate.start);
   console.log(this.selectedDate.end);
}
  }
};
</script>

<!-- -->
<style lang="scss">
@import "../scss/main";

.contentBuy {
  @extend %center;
  flex-direction: column;
  background-color: #5bd9ff;
  width: 50%;
  margin: 0 auto;
  padding: 10px;
  font-size: 1.3rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
  color: black;
}

.artist {
  margin: 0;
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

.counter {
  padding: 10px;
  font-size: 1.6rem;
}

.decrease {
  display: inline-block;
  padding: 10px;
  color: rgb(245, 87, 87);
  cursor: pointer;
}

.increase {
  display: inline-block;
  padding: 10px;
  color: rgb(3, 104, 17);
  cursor: pointer;
}

.num-days {
  display: inline-block;
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
</style>
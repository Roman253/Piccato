<template>
  <div class="maincalendar">
    <h2>Choose dates</h2>

           

    <div class="calendar">
            <button class="search-btn" v-on:click="search"> TEST </button>

      <v-date-picker mode="range" v-model="selectedDate" :min-date="new Date()" show-caps></v-date-picker>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedValue: new Date(),

      selectedDate: {
        start: new Date(),
        end: new Date()
      }
    };
  },
methods: {
  search: function () {
   console.log(this.selectedDate.start);
   console.log(this.selectedDate.end);
}}
};
</script>

<style lang="scss">
@import "../scss/main.scss";

.calendar {
  margin: 0 auto;
}

.popover-container[data-v-1ad2436f] {
  width: 17%;
  margin: 0 auto;
}
</style>

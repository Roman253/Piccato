<template>
  <div class="maincalendar">
    <div class="calendar">
      <v-date-picker mode="range" is-inline v-model="selectedDate" :min-date="new Date()" show-caps></v-date-picker>
    </div>
  </div>
</template>

<script>
export default {
  name: "calendar",
  data() {
    return {
      selectedValue: new Date(),

      selectedDate: {
        start: new Date(),
        end: new Date()
      }
    };
  },
  methods: {}
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

.calendarDate {
  margin: 0 auto;
  margin-bottom: 300px;
  margin-left: 35%;
}

.popover-container[data-v-1ad2436f] {
  margin: 0 auto;
}
</style>

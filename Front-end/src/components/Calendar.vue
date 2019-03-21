<template>
  <div class="maincalendar">
    <div class="calendar">
      <v-date-picker
        mode="range"
        is-inline
        v-model="selectedDate"
        @input="emitMethod"
        :disabled-dates="bookedDates"
        :min-date="new Date()"
        is-double-paned
        :attributes="attributes"
        show-caps
      ></v-date-picker>
    </div>
  </div>
</template>

<script>
import EventBus from "../event-bus";
export default {
  name: "calendar",
  data() {
    return {
      selectedDate: {
        start: new Date(),
        end: new Date()
      },
      bookedDates: []
    };
  },
  methods: {
    emitMethod() {
      EventBus.$emit("selectedDates", this.selectedDate);
    }
  },
  computed: {
    attributes() {
      return this.bookingsData.map(t => ({
        // key: `t.artworkID`,
        highlight: {
          backgroundColor: "red",
          borderColor: "black",
          borderWidth: "1px",
          borderStyle: "solid",
          opacity: 0.7,
          animated: true
        },
        contentStyle: {},
        popover: {
          label:
            "These dates are booked by other customers, please select a different one"
        },
        dates: t.selectedDate
      }));
    },
    bookingsData() {
      return this.$store.state.bookings;
    }
  },
  mounted() {
    this.$store.dispatch("getBookings");
    return this.bookingsData.map(t => this.bookedDates.push(t.selectedDate));
  }
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

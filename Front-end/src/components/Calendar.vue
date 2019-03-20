<template>
  <div class="maincalendar">
    <div class="calendar">
      <v-date-picker mode="range" is-inline v-model="selectedDate" 
          :min-date="new Date()" is-double-paned :attributes='attributes' show-caps>
      </v-date-picker>
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
  methods: {
    search: function() {
      console.log(this.selectedDate.start);
      console.log(this.selectedDate.end);
    }
  },
  computed: {
     attributes() {
       return this.bookedDates.map(t => ({
          key: `t.artworkID`,
          highlight: {
            backgroundColor: 'red',
            borderColor: '#ff6666',
            borderWidth: '2px',
            borderStyle: 'solid',
          },
          contentStyle: {
            color: 'white'
          },
          dates: t.selectedDate,
          customData: t,
        }));

      },
        bookedDates() {
            return this.$store.state.bookings;
        }
    }

  }
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

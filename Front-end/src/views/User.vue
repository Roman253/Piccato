<template>
  <article id="user">
    <h2> User </h2>
    <h3> Manage your bookings </h3>


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
          <td> {{artwork.title}}  </td>
          <td> {{artwork.artist}} </td>
          <td> <button @click="artwork; deleteBooking()">X</button> </td>
          </tr>

        </tbody>
      </table>
      </section>


  
  </article>
</template>

<script>

export default {
    name: 'artworks', 
    props: ['artwork'],
    beforeMount() {
    this.$store.dispatch('getArtworks');
    },
    
    data() {
        return {
            artwork: [], 
            search: "",
        }
    }, 

methods: {

      deleteBooking() {
     this.$store.dispatch('deleteBooking', this.artwork);
      }
  },

    computed: {
        artworks() {
            return this.$store.state.artworks;
        }, 
  }
}
</script>

<style lang="scss">
@import '../scss/main.scss';


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
    } }
    


@media only screen and (max-width: 400px) {

.artworklist  {
  width: 100%;
}

table {
  font-size: .7rem;
  text-align: left;
}

td {
  font-size: .5rem;
}

}



</style>



<template>
  <main id="user">
    <section class="container">

<h2> User page </h2>
<h3>See your bookings and rentals here </h3>

      <section class="artworks">
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
          <tr>
          <td> Curios Cat  </td>
          <td> 2019-03-10 - 2019-03-11 </td>
          <td> X </td>
          </tr>

          <tr>
          <td> Curios Cat  </td>
          <td> 2019-03-22 - 2019-03-24 </td>
          <td> X </td>
          </tr>



          <tr v-for="artwork in artworks" :key="artwork._title" :artwork="artwork">
            <td>{{artwork.title}}</td>
            <td>{{booked.date}} </td>

          </tr>
        </tbody>
      </table>
      </section>

      <a href="#" class="btn" @click="logout" >Logout</a>
 
    </section>
  </main>
</template>

<!-- Functions -->
<script>
export default { 
  name: 'user',
    beforeMount() {
    this.$store.dispatch('getArtwork');
  },

  computed: {
    artworks() {
      return this.$store.state.artwork;
    }
  },
  methods: {
     logout (){
          this.$store.dispatch('logout');
          this.$router.push('/login');
    }
  }
}
</script>


<style lang="scss">
@import '../scss/main';
$baseline: 2.5rem;
#user {
  color: black;
  @extend %center;


  .container {
    max-width: 1000px;
    width:100%;

    h3 {
      font-size: 1.2rem;
      color: black;
      margin-bottom: 1rem;
    }
    
    .artworks {
      background: rgb(91, 217, 255);
      border-radius: 3px;
      padding: 1rem;
      color: black;
      
    table {
      width: 100%;

      thead {
        tr {
          color: rgb(86, 115, 245);
          text-transform: uppercase;

          th {
            border-bottom: 1px solid #fff;
            padding: 0.5rem 0;
          }
        }
      }
    }
    tbody {

      tr {
         td {
          color: black;
           padding: 1rem 0;
           font-size: 1rem;

           }

      }
    }
  
  

    }}} 
    
    
    </style>

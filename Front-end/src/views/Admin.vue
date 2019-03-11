<template>
  <main id="admin">
    <section class="container">

<h2> Admin page </h2>


      <section class="artworks">
      <table cellspacing="0">
        <thead>
          <tr>
            <th>Artwork</th>
            <th>Dates booked</th>
            <th>Remove</th>

          </tr>
        </thead>
        <!-- Import artworks from DB -->
        <tbody> 

          <tr>
          <td> Curios Cat  </td>
          <td> 2019-03-10 - 2019-03-11</td>
          <td> </td>

          </tr>

          <tr>
          <td> Curios Cat  </td>
          <td> 2019-03-23 - 2019-03-24</td>
          <td> X </td>

          </tr>

          <tr v-for="artwork in artworks" :key="artwork._title" :artwork="artwork">
            <td>{{artwork.title}}</td>
            <td>{{booked.date}} </td>

          </tr>
        </tbody>
      </table>
      </section>
       <section>

         <h3>Add new Artwork</h3>
        <footer  class="form">          
          <input type="text" placeholder="Title" v-model="newArtwork.title">
          <input type="text" placeholder="Artist" v-model="newArtwork.artist">
          <input type="text" placeholder="Price" v-model="newArtwork.price">
          <input type="text" placeholder="Description" v-model="newArtwork.description">
          <input type="text" placeholder="Image URL" v-model="newArtwork.imgurl">
          <input type="text" placeholder="Size" v-model="newArtwork.size">

          <a href="#" class="btnAddArt" @click="createArtwork">Add artwork</a>
        </footer>
      </section>
    </section>
  </main>
</template>

<!-- Functions -->
<script>
export default { 
  name: 'admin',
    beforeMount() {
    this.$store.dispatch('getArtwork');
  },
  data() {
    /* Schema for DB */
    return {
      newArtwork: {
        title: "",
        artist: "",
        price: "",
        imgurl: "",
        size: "",
      }
    }
  },

methods: {
    async createArtwork(){
      this.$store.dispatch('createArtwork', this.newArtwork);
      this.$store.dispatch("getArtwork");
    }
  },
  computed: {
    artworks() {
      return this.$store.state.artwork;
    }
  }
}
</script>


<style lang="scss">
@import '../scss/main';
$baseline: 2.5rem;
#admin {
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
  }
  .form {
    display: grid;
    background: rgb(91, 217, 255);
    padding: 1rem;
    grid-gap: .5rem;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: $baseline;
    grid-template-areas: 
    "name name"
    "artist artist"
    "price"
    "description"
    "btn btn";

    input {
      max-width: 42vw;
      font-family: 'Avenir', sans-serif;
      background: none;
      border: 1px solid white;
      border-radius: 3px;
      padding: .25rem;
      font-size: 1.2rem;
      color: black;
      &.name {grid-area: name}
      &.artist {grid-area: location}
      &.price {grid-area: price}
      &.description {grid-area: description}
      &.imgurl {grid-area: imgurl}
      }
    }
  }
  .btnAddArt {

        width: 202%;
        height: 2rem;
        padding: 10px 0px -5px 0px;
        margin: 4px 0;
        margin-top: 1rem;
        border: none;
        border-radius: 4px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #fff;
        font-size: 21px;
        font-family: 'Merienda One', sans-serif;
        background: #31578f;
        text-decoration: none;
        cursor: pointer;

  }
  .btnAddArt:hover {
    background-color: rgb(121, 231, 250);
  }
}
</style>

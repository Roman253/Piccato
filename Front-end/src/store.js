import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        artwork: {},
        artworks: [],
        booking: []

    },
    mutations: {
        //update array with artworks
        setArtworks(state, artworks) {
            state.artworks = artworks;
        },
        selectArtwork(state, artwork) {
            state.artwork = artwork;
        },

    },
    actions: {

        async createArtwork(ctx, artwork) {
            try {
                await axios.post("http://localhost:3000/artworks", artwork);
                ctx.dispatch("getArtworks");
            } catch (err) {
                // eslint-disable-next-line no-console
                console.err(err.stack);
            }
        },

        async deleteArtwork(ctx, id) {
            // console.log(id)
            await axios.delete(`http://localhost:3000/artworks/${id}`);
        },


        //get artwork from the API
        async getArtworks(ctx) {
            let artworks = await axios.get('http://localhost:3000/artworks');
            ctx.commit('setArtworks', artworks.data);
            //console.log(artwork.data);
        },



  }, 
  getters: {
    
    artworks(state) {
      return state.artworks;
    },

    /*
    getArtworkById(state) {
      return (artworkId) => {
        return state.artworks.filter(artwork => artwork.id == artworkId);
      }
    },
    */

    getArtworkDescById(state){
      return (artworkId) => {
        return state.artwork.filter(artwork => artwork.id == artworkId);
      }
    }

  }

})
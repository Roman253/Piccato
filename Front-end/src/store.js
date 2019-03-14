import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    artwork: {},
    artworks: [],
    posts: []

  },
  mutations: {
    //update array with artworks
    setArtworks(state, artworks) {
      state.artworks = artworks.data;
    } 
    
  },
  actions: {
    //get artwork from the API
    async getArtworks(ctx) {
      let artworks = await axios.get('http://localhost:3000/artworks');
      ctx.commit('setArtworks', artworks.data);
      
      }
      

  },
  getters: {
    artworks(state) {
      return state.artworks;
    },
    getArtworkById(state) {
      return (artworkId) => {
        return state.artworks.filter(artwork => artwork.id == artworkId);
      }
    }, 
    getArtworkDescById(state){
      return (artworkId) => {
        return state.artwork.filter(artwork => artwork.id == artworkId);
      }
    }


  }

})

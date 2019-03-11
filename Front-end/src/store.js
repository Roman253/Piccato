import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    artwork:{},
    artworks: []

  },
  mutations: {
    //update array with artworks
    setArtworks(state, artworks) {
      state.artworks = artworks;
    }

  },
  actions: {
  //get artwork from the API
  async getArtworks(ctx) {
    let artworks = await axios.get('http://localhost:3000/artworks');
    ctx.commit('setArtworks', artworks.data);
    //console.log(artwork.data);
  }

  }
})

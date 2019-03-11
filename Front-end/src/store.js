import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        artwork: {},
        artworks: []

    },
    mutations: {
        //update array with artworks
        setArtwork(state, artwork) {
            state.artworks = artwork;
        }

    },
    actions: {
        //get artwork from the API
        async getArtworks(ctx) {
            let artwork = await axios.get('http://localhost:3000/artworks');
            ctx.commit('setArtwork', artwork.data);
        }

    }
})
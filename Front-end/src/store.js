import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiUrl: 'http://localhost:3000',
    artwork:{},
    artworks: [],
    activeUser: '',
    rejected: false
  },
  mutations: {
    //update array with artworks
    setArtworks(state, artworks) {
      state.artworks = artworks;
    },
    setActiveUser(state, user){
      state.activeUser = user;
    },
    toggleRejected(state){
      state.rejected = !state.rejected;
    }
  },
  actions: {
  //get artwork from the API
  async getArtworks(ctx) {
    let artworks = await Axios.get('http://localhost:3000/artworks');
    ctx.commit('setArtworks', artworks.data);
    //console.log(artwork.data);
  },

  async login(ctx, loginData){


    try {

      let token = await Axios.post(`${ctx.state.apiUrl}/auth`, loginData);
      
      console.log(token);

      sessionStorage.setItem('loginToken', token.data.authToken);

      ctx.commit('setActiveUser', token.username);

      ctx.dispatch('getItems');

    } catch(err) {

          ctx.commit('toggleRejected');
        setTimeout(()=> {
          ctx.commit('toggleRejected');
        }, 1000)

        console.error(err);
    }
  }

  }
})

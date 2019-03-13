import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiUrl: 'http://localhost:3000',
    artwork:{},
    artworks: [],
    activeUser: null,
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

        await Axios.post(`${ctx.state.apiUrl}/auth`, loginData)
        .then(response => {

          console.log(response.data);
          console.log(loginData);
          ctx.commit('setActiveUser', response.data.email);
          sessionStorage.setItem('loginToken', response.data.authToken );


          if(response.data.role === 'admin') {
            sessionStorage.setItem('isAdmin', response.data.role );
            router.push('/admin');
          } else {
            router.push('/user');
          }
      })

    } catch(err) {

          ctx.commit('toggleRejected');
        setTimeout(()=> {
          ctx.commit('toggleRejected');
        }, 1000)

        console.error(err);
    }
  },

   async logout (ctx){

    sessionStorage.clear();

    ctx.commit('setActiveUser', null);

  }

  }
})

/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiUrl: 'http://localhost:3000',
    artwork: {},
    artworks: [],
    booking: [],
    activeUser: '',
    loginError: null,
    thereIsError: false,
    success: false
  },
  mutations: {
    //update array with artworks
    //update array with artworks
    setArtworks(state, artworks) {
      state.artworks = artworks;
    },
    selectArtwork(state, artwork) {
      state.artwork = artwork;
    },
    setActiveUser(state, user) {
      state.activeUser = user;
    },
    toggleRejected(state) {
      state.rejected = !state.rejected;
    },
    setRegistrationMessage(state, message) {
      state.registrationMessage = message;
    },
    setLoginError(state, message) {
      state.loginError = message
    },
    toggleError(state) {
      state.thereIsError = !state.thereIsError;
    },
    changeError(state, message) {
      state.thereIsError = message
    },
    success(state, message) {
      state.success = message
    }
  },
  actions: {
    //get artwork from the API
    async createArtwork(ctx, artwork) {
      try {
        await Axios.post("http://localhost:3000/artworks", artwork);
        ctx.dispatch("setArtworks");
      } catch (err) {
        // eslint-disable-next-line no-console
        console.err(err.stack);
      }
    },

    async deleteArtwork(ctx, id) {
      // console.log(id)
      await Axios.delete(`http://localhost:3000/artworks/${id}`);
    },


    //get artwork from the API
    async getArtworks(ctx) {
      let artworks = await Axios.get('http://localhost:3000/artworks');
      ctx.commit('setArtworks', artworks.data);
      //console.log(artwork.data);
    },
    async login(ctx, loginData) {

      try {

        await Axios.post(`${ctx.state.apiUrl}/auth`, loginData)
          .then(response => {

            console.log(response.data);
            console.log(loginData);
            ctx.commit('setActiveUser', response.data);
            sessionStorage.setItem('loginToken', response.data.authToken);
            ctx.commit('toggleRejected');

            if (response.data.role === 'admin') {
              sessionStorage.setItem('isAdmin', response.data.role);
              router.push('/admin');
            } else {
              router.push('/user');
            }
          })

      } catch (err) {

        if (!err) {
          ctx.commit('toggleError');
        }
        ctx.commit('toggleRejected');
        setTimeout(() => {
          ctx.commit('toggleRejected');
        }, 1000)
        console.error(err.response.data);
        ctx.commit('setLoginError', err.response.data);
      }
    },

    async logout(ctx) {

      sessionStorage.clear();

      ctx.commit('setActiveUser', null);

      console.log(response.data);
      console.log(loginData);
      ctx.commit('setActiveUser', response.data);
      sessionStorage.setItem('loginToken', response.data.authToken);
      sessionStorage.setItem('currentUser', response.data.email);
      sessionStorage.setItem('userData', JSON.stringify(response.data));
      if (response.data.role === 'admin') {
        sessionStorage.setItem('isAdmin', response.data.role);
        router.push('/admin');
      } else {
        router.push('/user');
      }
        ctx.commit('changeError', true);
        ctx.commit('toggleRejected');
        console.error(err.response.data);
        ctx.commit('setLoginError', err.response.data);


    },

    async logout(ctx) {

      sessionStorage.clear();
      ctx.commit('setActiveUser', '');
      ctx.commit('success', false);

    },
    async register(ctx, registrationData) {

      try {
        await Axios.post(`${ctx.state.apiUrl}/users/register`, registrationData)
          .then(response => {
            console.log(response.data);
            console.log('Registration successful');
            router.push('/login');
            sessionStorage.setItem('recentRegister', response.data.email);
          })
        ctx.commit('success', true);

      } catch (err) {
        ctx.commit('changeError', true);
        ctx.commit('setLoginError', err.response.data);
        ctx.commit('success', false);
        ctx.commit('setActiveUser', '');
        console.log(err);
      }
    },
    deleteErrors(ctx) {
      ctx.commit('setLoginError', '');
      ctx.commit('changeError', false);

    },
    setUser(ctx) {
      ctx.commit('setActiveUser', JSON.parse(sessionStorage.getItem('userData')));
    }
  }

  ,
  getters: {

    artworks(state) {
      return state.artworks;
    },
    getArtworkById(state) {
      return (artworkId) => {
        return state.artworks.filter(artwork => artwork.id == artworkId);
      }
    },
    getArtworkInfoById(state) {
      return (artworkId) => {
        return state.artworks.filter(artwork => artwork.id == artworkId);
      }
    }

  }


})
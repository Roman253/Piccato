/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        apiUrl: 'http://localhost:3000',
        artwork: {},
        artworks: [],
        booking: [],
        activeUser: null,
        rejected: false,
        registrationMessage: '',
        loginError: '',
        thereIsError: true,
    },
    mutations: {
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
        }
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

        async login(ctx, loginData) {

            try {

                await axios.post(`${ctx.state.apiUrl}/auth`, loginData)
                    .then(response => {

                        console.log(response.data);
                        console.log(loginData);
                        ctx.commit('setActiveUser', response.data.email);
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

        },
        async register(ctx, registrationData) {

            try {
                await axios.post(`${ctx.state.apiUrl}/users/register`, registrationData)
                    .then(response => {
                        console.log(response.data);
                        console.log('Registration successful');
                    })
            } catch (err) {
                ctx.commit('setRegistrationMessage', err);
                console.log(err);
            }
        },

        deleteErrors(ctx) {
            ctx.commit('setLoginError', '');
        }
    }
})
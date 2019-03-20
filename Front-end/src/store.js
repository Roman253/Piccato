/* eslint-disable no-empty */
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
        booking: null,
        activeUser: '',
        loginError: null,
        thereIsError: false,
        success: false
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
        setBookings(state, bookings) {
            state.booking = bookings
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
                ctx.dispatch("getArtworks");
            } catch (err) {
                // eslint-disable-next-line no-console
                console.err(err.stack);
            }
        },

        async deleteArtwork(ctx, id) {
            console.log(id._id)
            await Axios.delete(`http://localhost:3000/artworks/${id._id}`);
        },

        async sendEditArtwork(ctx, artwork) {
            try {
                await Axios.put(`http://localhost:3000/artworks`, artwork);
                ctx.dispatch("getArtworks");
            } catch (err) {
                // eslint-disable-next-line no-console
                console.err(err.stack);
            }
        },
        async getBookings(ctx, bookings) {

            try {
                let bookings = await Axios.get(`${ctx.state.apiUrl}/bookings`, bookings)
                .then(response => {
                    ctx.commit('setBookings', response.data);
                    console.log(response.data);
                })
         
            }catch (err) {
                console.log(err);
            }

   
        },
        //get artwork from the API
        async getArtworks(ctx) {
            let artworks = await Axios.get('http://localhost:3000/artworks');
            ctx.commit('setArtworks', artworks.data);
            //console.log(artwork.data);
        },
        async bookArtwork(ctx, bookingData) {

            try {
                await Axios.post(`${ctx.state.apiUrl}/bookings`, bookingData)
                    .then(response => {
                        console.log(response);
                    })

            } catch (err) {
                console.error(err);
            }
        },
        async login(ctx, loginData) {

            try {

                await Axios.post(`${ctx.state.apiUrl}/auth`, loginData)
                    .then(response => {

                        ctx.commit('setActiveUser', response.data);
                        sessionStorage.setItem('currentUser', response.data.email);
                        sessionStorage.setItem('userData', JSON.stringify(response.data));

                    })

            } catch (err) {

                ctx.commit('changeError', true);
                console.error(err.response.data);
                ctx.commit('setLoginError', err.response.data);
            }
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
    },    beforeCreate: function () {
        this.$store.dispatch("getBookings");
    }

})
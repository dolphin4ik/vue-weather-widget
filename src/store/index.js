import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        city: '',
        country: '',
        tempF: false,
        description: '',
        forecast: []

    },
    mutations: {
        setCity(state, payload){
            state.city = payload;
        },
        setCountry(state, payload){
            state.country = payload;
        },
        setTempF(state, payload){
            state.tempF = payload;
        },
        setDescription(state, payload){
            state.description = payload;
        },
        setForecast(state, payload){
            state.forecast = payload;
        }
    },
    getters: {
        tempC: s => s.tempF ? (s.tempF - 32) / 1.8 : false
    },
    actions: {
        init: ({commit}, payload) => {

            commit('setCity', payload.city);
            commit('setCountry', payload.country);
            commit('setTempF', parseInt(payload.tempF));
            commit('setDescription', payload.description);
            commit('setForecast', payload.forecast);
            
        },
        initFromApi: ({dispatch}) => {

            fetch('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22saint-petersburg%2C%20leningradskaya%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
            .then(resp => resp.json())
            .then(data => {
                let w = data.query.results.channel;
                dispatch('init', {
                    city: w.location.city,
                    country: w.location.country,
                    tempF: w.item.condition.temp,
                    description: w.item.condition.text,
                    forecast: w.item.forecast
                })
            })
            .catch(err => {
                console.log('err',err)
            });

        }
    }
});

export default store;
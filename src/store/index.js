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
        },
        init(state, payload){
            Object.assign(state, payload);
        }
    },
    actions: {
        init: ({commit}, payload) => {
            commit('init', payload);
        },
        initFromApi: ({dispatch}) => {

            console.info(`Updating from API`);

            fetch('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22saint-petersburg%2C%20leningradskaya%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
            .then(resp => resp.json())
            .then(data => {
                let w = data.query.results.channel;
                w.item.forecast.shift();
                dispatch('init', {
                    city: w.location.city,
                    country: w.location.country,
                    tempF: w.item.condition.temp,
                    description: w.item.condition.text,
                    forecast: w.item.forecast
                })
            })
            .catch(err => {
                console.log(`err Updating from API`,err)
            });

        }
    }
});

export default store;
import Vue from 'vue';
import store from './store';
import Weather from './Weather.vue';

new Vue({
	el: 'vww',
	store,
	render: h => h(Weather)
});
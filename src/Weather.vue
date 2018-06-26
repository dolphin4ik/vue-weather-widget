<template>
	<div class="weather-widget">
		<div class="card bg-dark text-white">
			<img src="./assets/space.png" alt="image" class="card-img">
			<div class="card-img-overlay">
				<h4 class="display-4 text-center">{{ city }}</h4>
				<p class="text-center lead text-muted">{{ country }}</p>
				<p class="display-4 text-center" v-if="tempF">{{ tempF | tempFtoC }}°</p>
				<p class="card-text text-center">{{ description }}</p>
			</div>
			<forecast v-bind:list="forecast" />
		</div>
		<img title="Options" class="widget-menu-icon" src="./assets/menu.png" />
	</div>
</template>

<style scoped>
	.weather-widget {
		position: relative;
		width: 200px;
		margin: 25px auto;
		border-radius: .40rem;
		overflow: hidden;
		box-shadow: 0 0 2px 1px rgb(199, 199, 199);
	}
	.weather-widget .card {
		border: none;
	}
	.weather-widget h4 {
		margin: 0;
		font-size: 1.6rem;
	}
	.weather-widget .widget-menu-icon {
		height: 16px;
		widows: 16px;
		position: absolute;
		right: 2px;
		top: 3px;
		cursor: pointer;
	}
	.weather-widget .card-img {
		height: 300px;
	}
</style>

<script>
import Vue from 'vue';
import filter from './filters/';
import Forecast from './Forecast.vue';
import { mapActions, mapState, mapGetters } from 'vuex';

const options = () => {
	return {
		data: function(){
			return {};
		},
		computed: {
			...mapState([
				'city', 'country', 'description', 'tempF', 'forecast'
			])
		},
		methods: {
			...mapActions([
				'initFromApi'
			])
		},
		props: {
			attr1: {
				type: Number,
				default: 0
			}
		},
		mounted: function(){
			this.initFromApi();
			let t = setInterval(()=>{
				this.initFromApi();
			}, 1000 * 60 * 1);
		}
	}
}

export default Vue.component('weather', options());

</script>
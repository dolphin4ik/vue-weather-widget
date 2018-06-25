<template>
	<div class="weather-widget">
		<div class="card bg-dark text-white">
			<img src="http://celebwallpapers.net/wp-content/uploads/2017/11/iphone-x-wallpaper-pack-1-beautiful-i-phone-wallpaper-of-i-phone-wallpaper-200x300.png" alt="image" class="card-img">
			<div class="card-img-overlay">
				<h4 class="display-4 text-center">{{ city }}</h4>
				<p class="text-center lead text-muted">{{ country }}</p>
				<p class="display-4 text-center" v-if="tempC">{{ tempC }} C°</p>
				<p class="card-text text-center">{{ description }}</p>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.weather-widget {
		width: 200px;
		margin: 25px auto;
	}
	.weather-widget h4 {
		margin: 0;
		font-size: 1.6rem;
	}
	.weather-widget img {
		height: 300px;
	}
</style>

<script>
import Vue from 'vue';
import { mapActions, mapState, mapGetters } from 'vuex';

const options = () => {
	return {
		data: function(){
			return {};
		},
		computed: {
			...mapState([
				'city', 'country', 'description', 'tempF'
			]),
			...mapGetters([
				'tempC'
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
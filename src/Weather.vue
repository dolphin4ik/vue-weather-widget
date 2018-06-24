<template>
	<div>
		<div>{{ city }}</div>
		<div>{{ country }}</div>
		<div>{{ description }}</div>
		<div v-if="tempC">{{ tempC }}</div>
	</div>
</template>

<style scoped>
	
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
		created: function(){
			this.initFromApi();
			let t = setInterval(()=>{
				this.initFromApi();
			}, 1000 * 60)
		},
		mounted: function(){}
	}
}

export default Vue.component('weather', options());

</script>
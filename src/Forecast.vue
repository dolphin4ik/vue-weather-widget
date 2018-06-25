<template>
    <transition name="fade">
        <div v-if="days.length" class="card-img-overlay forecast">
            <div v-for="(day, index) in days" class="forecast-item" :key="index">
                <span class="forecast-day">{{ index == 0 ? 'Tomorrow' : day.day }}</span>
                <span class="forecast-temp">{{day.low | tempFtoC}}° - {{day.high | tempFtoC}}°</span>
            </div>
        </div>
    </transition>
</template>

<style scoped>
    .forecast {
        background-color: rgba(27, 27, 27, 0.3);
		bottom: 0;
		top: unset;
		padding: 0;
		height: 58px;
	}
    .forecast-item {
		padding: 2px 7px 2px 7px;
	}
    .forecast-temp {
		float: right;
	}

    .fade-enter-active, .fade-leave-active {
        transition: opacity .9s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>

<script>
import Vue from 'vue';

const fullDay = Vue.filter('fullDay');

const options = () => {
    return {
        props: {
            list: {
                type: Array,
                default: false
            }
        },
        computed: {
            days: vm => {
                return vm.list.map(d => {
                    return {...d, day: fullDay(d.day)}
                })
            }
        }
    }
}

export default Vue.component('forecast', options());
</script>
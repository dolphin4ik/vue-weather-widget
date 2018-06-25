import Vue from 'vue';

const tempFtoC = Vue.filter('tempFtoC', function (value) {
    return value ? Math.ceil((value - 32) / 1.8) : false;
});

const tempCtoF = Vue.filter('tempCtoF', function (value) {
    return value ? Math.ceil((value * 1.8) + 32) : false;
});

const fullDay = Vue.filter('fullDay', function (value) {
    switch(value){
        case 'Sun':
            return 'Sunday';
            break;
        case 'Mon':
            return 'Monday';
            break;
        case 'Tue':
            return 'Tuesday';
            break;
        case 'Wed':
            return 'Wednesday';
            break;
        case 'Thu':
            return 'Thursday';
            break;
        case 'Fri':
            return 'Friday';
            break;
        case 'Sat':
            return 'Saturday';
            break;
    }
});

export default {
    tempCtoF,
    tempFtoC
}
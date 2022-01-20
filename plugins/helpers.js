import Vue from 'vue';
Vue.prototype.$helpers = {

    // create helpers that you can access 
    // through the whole application

    averageRating: (insurance) => {
        let keys = [
            'rating_waiting_period',
            'rating_age',
            'rating_veterinary',
            'rating_life_insurance',
            'rating_excess',
            'rating_price'
        ];

        var sum = 0;
        keys.forEach(key => {
            sum += parseInt(insurance.data[key]);
        });

        return (sum / keys.length).toPrecision(2) + "";
    }
    
};
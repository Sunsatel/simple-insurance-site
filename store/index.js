let _ = require('lodash');

export const state = () => ({
    settings: {},
    navigation: {},
    insurances: [],
    posts: []
})

export const mutations = {
    SET_SETTINGS(state, settings) {
        state.settings = settings;
    },

    SET_INSURANCES(state, insurances) {
        state.insurances = insurances
    },

    SET_POSTS(state, posts) {
        state.posts = posts;
    },

    SET_NAVIGATION(state, navigation) {
        state.navigation = navigation;
    },
}

export const actions = {
    async fetchStates({ commit }, $prismic) {
        try {
            if(_.size(this.state.settings) == 0) {
                const settings = (await $prismic.api.getSingle('settings')).data;
                commit('SET_SETTINGS', settings);
            }

            if(_.size(this.state.navigation) == 0) {
                const navigation = (await $prismic.api.getSingle('navigation')).data;
                commit('SET_NAVIGATION', navigation);
            }

            if(_.size(this.state.insurances) == 0) {
                const response = await $prismic.api.query(
                    $prismic.predicates.at('document.type', 'insurance'),
                );

                if(response.results_size > 0) {
                    commit('SET_INSURANCES', _.keyBy(response.results, 'id'));
                }
            }

            if(_.size(this.state.posts) == 0) {
                const response = await $prismic.api.query(
                    $prismic.predicates.at('document.type', 'post'),
                    {pageSize: 50, orderings : '[document.first_publication_date desc]'}
                );

                if(response.results_size > 0) {
                    commit('SET_POSTS', response.results);
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
}

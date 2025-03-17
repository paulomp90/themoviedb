export default {
    namespaced: true,
    state: {
        data: {},
    },
    getters: {
        data: (state) => state.data,
    },
    actions: {
        async getData({ commit }) {
            commit('SET_DATA', {})
        },
    },
    mutations: {
        SET_DATA(state, data) {
            state.data = data
        },
    },
}

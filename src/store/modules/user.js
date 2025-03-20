export default {
    namespaced: true,
    state: {
        favoriteMovies: JSON.parse(localStorage.getItem('favoriteMovies')) || [],
    },
    getters: {
        favoriteMovies: (state) => state.favoriteMovies,
        isFavorite: (state) => (movieId) => state.favoriteMovies.includes(parseInt(movieId)),
    },
    mutations: {
        ADD_FAVORITE_MOVIE(state, movieId) {
            if (!state.favoriteMovies.includes(movieId)) {
                state.favoriteMovies.push(movieId)
                localStorage.setItem('favoriteMovies', JSON.stringify(state.favoriteMovies))
            }
        },
        REMOVE_FAVORITE_MOVIE(state, movieId) {
            state.favoriteMovies = state.favoriteMovies.filter((id) => id !== movieId)
            localStorage.setItem('favoriteMovies', JSON.stringify(state.favoriteMovies))
        },
    },
    actions: {
        toggleFavorite({ commit, state }, movieId) {
            if (state.favoriteMovies.includes(movieId)) {
                commit('REMOVE_FAVORITE_MOVIE', movieId)
            } else {
                commit('ADD_FAVORITE_MOVIE', movieId)
            }
        },
    },
}

export default {
    toggleFavorite({ commit, state }, movieId) {
        if (state.favoriteMovies.includes(movieId)) {
            commit('REMOVE_FAVORITE_MOVIE', movieId)
        } else {
            commit('ADD_FAVORITE_MOVIE', movieId)
        }
    },
}

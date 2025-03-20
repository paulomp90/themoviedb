export default {
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
}

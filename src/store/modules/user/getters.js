export default {
    favoriteMovies: (state) => state.favoriteMovies,
    isFavorite: (state) => (movieId) => state.favoriteMovies.includes(parseInt(movieId)),
}

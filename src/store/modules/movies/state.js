export default {
    // Movie details feature
    movieDetails: null,
    similarMovies: [],

    // Search and pagination feature
    allMovies: [],
    fetchedPages: new Set(),
    filters: {
        query: '',
        year: '',
    },
    perPage: 10,
    totalResults: 0,
    currentPage: 1,
    tmdbPage: 1,

    // UI state
    loading: false,
}

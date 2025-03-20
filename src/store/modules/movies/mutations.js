export const MOVIES_MUTATIONS = {
    SET_LOADING: 'SET_LOADING',
    SET_MOVIE_DETAILS: 'SET_MOVIE_DETAILS',
    SET_SIMILAR_MOVIES: 'SET_SIMILAR_MOVIES',
    SET_MOVIES: 'SET_MOVIES',
    CLEAR_MOVIES: 'CLEAR_MOVIES',
    SET_PAGE: 'SET_PAGE',
    SET_QUERY: 'SET_QUERY',
    SET_PER_PAGE: 'SET_PER_PAGE',
    SET_TMDB_PAGE: 'SET_TMDB_PAGE',
    SET_FILTERS: 'SET_FILTERS',
}

export default {
    [MOVIES_MUTATIONS.SET_LOADING](state, value) {
        if (typeof value == 'boolean') {
            state.loading = value
        } else {
            state.loading = false
        }
    },
    [MOVIES_MUTATIONS.SET_MOVIE_DETAILS](state, movie) {
        state.movieDetails = movie
    },
    [MOVIES_MUTATIONS.SET_SIMILAR_MOVIES](state, movies) {
        state.similarMovies = movies
    },
    [MOVIES_MUTATIONS.SET_MOVIES](state, { movies, totalResults }) {
        if (!state.fetchedPages.has(state.tmdbPage)) {
            state.allMovies = [...state.allMovies, ...movies]
            state.fetchedPages.add(state.tmdbPage)
        }
        state.totalResults = totalResults
    },
    [MOVIES_MUTATIONS.CLEAR_MOVIES](state) {
        state.allMovies = []
        state.fetchedPages.clear()
    },
    [MOVIES_MUTATIONS.SET_PAGE](state, page) {
        if (typeof page == 'number') {
            state.currentPage = page
        }
    },

    [MOVIES_MUTATIONS.SET_PER_PAGE](state, perPage) {
        if (typeof perPage == 'number') {
            state.perPage = perPage
            state.currentPage = 1
        }
    },
    [MOVIES_MUTATIONS.SET_TMDB_PAGE](state, page) {
        if (typeof page == 'number') {
            state.tmdbPage = page
        }
    },
    [MOVIES_MUTATIONS.SET_FILTERS](state, filters) {
        state.filters = { ...state.filters, ...filters }
        state.currentPage = 1
        state.tmdbPage = 1
    },
}

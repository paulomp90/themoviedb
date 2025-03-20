import { options } from '@/helpers/requests'

// Mutation Types
const MUTATIONS = {
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
    namespaced: true,
    state: {
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
    },

    mutations: {
        [MUTATIONS.SET_LOADING](state, value) {
            state.loading = value
        },
        [MUTATIONS.SET_MOVIE_DETAILS](state, movie) {
            state.movieDetails = movie
        },
        [MUTATIONS.SET_SIMILAR_MOVIES](state, movies) {
            state.similarMovies = movies
        },
        [MUTATIONS.SET_MOVIES](state, { movies, totalResults }) {
            if (!state.fetchedPages.has(state.tmdbPage)) {
                state.allMovies = [...state.allMovies, ...movies]
                state.fetchedPages.add(state.tmdbPage)
            }
            state.totalResults = totalResults
        },
        [MUTATIONS.CLEAR_MOVIES](state) {
            state.allMovies = []
            state.fetchedPages.clear()
        },
        [MUTATIONS.SET_PAGE](state, page) {
            state.currentPage = page
        },

        [MUTATIONS.SET_PER_PAGE](state, perPage) {
            state.perPage = perPage
            state.currentPage = 1
        },
        [MUTATIONS.SET_TMDB_PAGE](state, page) {
            state.tmdbPage = page
        },
        [MUTATIONS.SET_FILTERS](state, filters) {
            state.filters = { ...state.filters, ...filters }
            state.currentPage = 1
            state.tmdbPage = 1
        },
    },

    actions: {
        async fetchMovieDetails({ commit }, id) {
            if (!id) throw new Error('No movie id provided')

            try {
                await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options())
                    .then((response) => response.json())
                    .then((data) => commit(MUTATIONS.SET_MOVIE_DETAILS, data))
            } catch (error) {
                console.error(`Error fetching movie ${id}:`, error)
                throw error
            }
        },

        async fetchSimilarMovies({ commit }, id) {
            if (!id) throw new Error('No movie id provided')

            commit(MUTATIONS.SET_LOADING, true)
            commit(MUTATIONS.SET_SIMILAR_MOVIES, [])
            try {
                await fetch(`https://api.themoviedb.org/3/movie/${id}/similar`, options())
                    .then((response) => response.json())
                    .then((data) => {
                        const similarMovies = data.results.slice(0, 5)

                        commit(MUTATIONS.SET_SIMILAR_MOVIES, similarMovies)
                    })
            } catch (error) {
                console.error(`Error fetching similar movies for ${id}:`, error)
                throw error
            } finally {
                commit(MUTATIONS.SET_LOADING, false)
            }
        },

        async fetchMovies({ commit, state }) {
            if (!state.filters.query) return

            commit(MUTATIONS.SET_LOADING, true)
            try {
                const searchParams = new URLSearchParams()

                if (state.filters.year) {
                    searchParams.append('primary_release_year', state.filters.year)
                }

                searchParams.append('query', state.filters.query)
                searchParams.append('page', state.tmdbPage)

                await fetch(`https://api.themoviedb.org/3/search/movie?${searchParams}`, options())
                    .then((response) => response.json())
                    .then((data) =>
                        commit(MUTATIONS.SET_MOVIES, {
                            movies: data.results,
                            totalResults: data.total_results,
                        }),
                    )
            } catch (error) {
                console.error('Error fetching movies:', error)
                throw error
            } finally {
                commit(MUTATIONS.SET_LOADING, false)
            }
        },

        updateFilters({ commit, state, dispatch }, filters) {
            commit(MUTATIONS.CLEAR_MOVIES)

            const newFilters = { ...state.filters, ...filters }

            commit(MUTATIONS.SET_FILTERS, newFilters)
            dispatch('fetchMovies')
        },

        updatePage({ commit, state, dispatch }, page) {
            commit(MUTATIONS.SET_PAGE, page)

            const itemsPerTMDbPage = 20
            const totalItemsNeeded = page * state.perPage
            const totalItemsAvailable = state.allMovies.length

            if (totalItemsNeeded > totalItemsAvailable) {
                const nextTMDbPage = Math.ceil(totalItemsNeeded / itemsPerTMDbPage)
                if (nextTMDbPage > state.tmdbPage) {
                    commit(MUTATIONS.SET_TMDB_PAGE, nextTMDbPage)
                    dispatch('fetchMovies')
                }
            }
        },

        updatePerPage({ commit }, perPage) {
            commit(MUTATIONS.SET_PER_PAGE, perPage)
        },
    },

    getters: {
        paginatedMovies: (state) => {
            const startIndex = (state.currentPage - 1) * state.perPage
            const endIndex = startIndex + state.perPage
            return state.allMovies.slice(startIndex, endIndex)
        },
        totalFrontendPages: (state) => Math.ceil(state.totalResults / state.perPage),
    },
}

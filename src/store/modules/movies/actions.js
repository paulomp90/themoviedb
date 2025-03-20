import { MOVIES_MUTATIONS } from './mutations'
import { options } from '@/helpers/requests'

export default {
    async fetchMovieDetails({ commit }, id) {
        if (!id) throw new Error('No movie id provided')

        try {
            await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options())
                .then((response) => response.json())
                .then((data) => commit(MOVIES_MUTATIONS.SET_MOVIE_DETAILS, data))
        } catch (error) {
            console.error(`Error fetching movie ${id}:`, error)
            throw error
        }
    },

    async fetchSimilarMovies({ commit }, id) {
        if (!id) throw new Error('No movie id provided')

        commit(MOVIES_MUTATIONS.SET_LOADING, true)
        commit(MOVIES_MUTATIONS.SET_SIMILAR_MOVIES, [])
        try {
            await fetch(`https://api.themoviedb.org/3/movie/${id}/similar`, options())
                .then((response) => response.json())
                .then((data) => {
                    const similarMovies = data.results.slice(0, 5)

                    commit(MOVIES_MUTATIONS.SET_SIMILAR_MOVIES, similarMovies)
                })
        } catch (error) {
            console.error(`Error fetching similar movies for ${id}:`, error)
            throw error
        } finally {
            commit(MOVIES_MUTATIONS.SET_LOADING, false)
        }
    },

    async fetchMovies({ commit, state }) {
        if (!state.filters.query) return

        commit(MOVIES_MUTATIONS.SET_LOADING, true)
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
                    commit(MOVIES_MUTATIONS.SET_MOVIES, {
                        movies: data.results,
                        totalResults: data.total_results,
                    }),
                )
        } catch (error) {
            console.error('Error fetching movies:', error)
            throw error
        } finally {
            commit(MOVIES_MUTATIONS.SET_LOADING, false)
        }
    },

    updateFilters({ commit, state, dispatch }, filters) {
        commit(MOVIES_MUTATIONS.CLEAR_MOVIES)

        const newFilters = { ...state.filters, ...filters }

        commit(MOVIES_MUTATIONS.SET_FILTERS, newFilters)
        dispatch('fetchMovies')
    },

    updatePage({ commit, state, dispatch }, page) {
        commit(MOVIES_MUTATIONS.SET_PAGE, page)

        const itemsPerTMDbPage = 20
        const totalItemsNeeded = page * state.perPage
        const totalItemsAvailable = state.allMovies.length

        if (totalItemsNeeded > totalItemsAvailable) {
            const nextTMDbPage = Math.ceil(totalItemsNeeded / itemsPerTMDbPage)
            if (nextTMDbPage > state.tmdbPage) {
                commit(MOVIES_MUTATIONS.SET_TMDB_PAGE, nextTMDbPage)
                dispatch('fetchMovies')
            }
        }
    },

    updatePerPage({ commit }, perPage) {
        commit(MOVIES_MUTATIONS.SET_PER_PAGE, perPage)
    },
}

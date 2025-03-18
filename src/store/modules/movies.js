import { options } from '@/helpers/requests'

export default {
    namespaced: true,
    state: {
        movies: [],
        similarMovies: [],
        movieDetails: null,
        loading: false,
    },
    mutations: {
        setListMovies(state, movies) {
            state.movies = movies
        },
        setLoading(state, value) {
            state.loading = value
        },
        setMovieDetails(state, movie) {
            state.movieDetails = movie
        },
        setSimilarMovies(state, movies) {
            const moviesToSave = movies.slice(0, 5)

            state.similarMovies = moviesToSave
        },
    },
    actions: {
        async fetchPopularMovies({ commit }) {
            try {
                commit('setLoading', true)
                await fetch('https://api.themoviedb.org/3/movie/popular', options())
                    .then((res) => res.json())
                    .then((data) => {
                        commit('setListMovies', data.results)
                    })
            } catch (error) {
                console.error('Error fetching movies:', error)
            } finally {
                commit('setLoading', false)
            }
        },
        async searchMovies({ commit }, query) {
            if (!query) {
                console.error('No query provided')
                return
            }
            try {
                commit('setLoading', true)
                const searchParams = new URLSearchParams({
                    query: query,
                })
                await fetch(`https://api.themoviedb.org/3/search/movie?${searchParams}`, options())
                    .then((res) => res.json())
                    .then((data) => {
                        commit('setListMovies', data.results)
                    })
            } catch (error) {
                console.error('Error searching movies:', error)
            } finally {
                commit('setLoading', false)
            }
        },
        async fetchMovieDetails({ commit }, id) {
            if (!id) {
                console.error('No movie id provided')
                return
            }
            try {
                await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options())
                    .then((res) => res.json())
                    .then((data) => {
                        commit('setMovieDetails', data)
                    })
            } catch (error) {
                console.error('Error fetching movie with id: ', id, ' - error:', error)
            }
        },
        async fetchSimilarMovies({ commit }, id) {
            if (!id) {
                console.error('No id provided')
                return
            }
            try {
                commit('setLoading', true)
                await fetch(`https://api.themoviedb.org/3/movie/${id}/similar`, options())
                    .then((res) => res.json())
                    .then((data) => {
                        commit('setSimilarMovies', data.results)
                    })
            } catch (error) {
                console.error(
                    'Error fetching similar movies for movie with id: ',
                    id,
                    ' - error:',
                    error,
                )
            } finally {
                commit('setLoading', false)
            }
        },
    },
    getters: {
        list: (state) => state.movies,
        isLoading: (state) => state.loading,
        movieDetails: (state) => state.movieDetails,
        similarMovies: (state) => state.similarMovies,
    },
}

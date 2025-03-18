import { options } from '@/helpers/requests'

export default {
    namespaced: true,
    state: {
        movies: [],
        loading: false,
    },
    mutations: {
        setListMovies(state, movies) {
            state.movies = movies
        },
        setLoading(state, value) {
            state.loading = value
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
            console.log('query:', query)
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
    },
    getters: {
        list: (state) => state.movies,
        isLoading: (state) => state.loading,
    },
}

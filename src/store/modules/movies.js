import { options } from '@/helpers/requests'

export default {
    namespaced: true,
    state: {
        movies: [],
    },
    mutations: {
        setListMovies(state, movies) {
            state.movies = movies
        },
    },
    actions: {
        async fetchMovies({ commit }) {
            try {
                await fetch('https://api.themoviedb.org/3/movie/popular', options())
                    .then((res) => res.json())
                    .then((data) => commit('setListMovies', data.results))
            } catch (error) {
                console.error('Error fetching movies:', error)
            }
        },
    },
    getters: {
        list: (state) => state.movies,
    },
}

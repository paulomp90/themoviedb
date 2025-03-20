import { describe, beforeEach, it, expect } from '@jest/globals'
import mutations, { MOVIES_MUTATIONS } from './mutations'

describe('Movies Mutations', () => {
    let state

    beforeEach(() => {
        state = {
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
    })

    it('SET_LOADING updates loading state', () => {
        mutations[MOVIES_MUTATIONS.SET_LOADING](state, true)
        expect(state.loading).toBe(true)

        mutations[MOVIES_MUTATIONS.SET_LOADING](state, false)
        expect(state.loading).toBe(false)

        mutations[MOVIES_MUTATIONS.SET_LOADING](state, 'testing')
        expect(state.loading).toBe(false)
    })

    it('SET_MOVIE_DETAILS updates movie details', () => {
        const movie = { id: 1, title: 'Test Movie' }
        mutations[MOVIES_MUTATIONS.SET_MOVIE_DETAILS](state, movie)

        expect(state.movieDetails).toEqual(movie)
    })

    it('SET_SIMILAR_MOVIES updates similar movies array', () => {
        const movies = [{ id: 1 }, { id: 2 }]

        mutations[MOVIES_MUTATIONS.SET_SIMILAR_MOVIES](state, movies)

        expect(state.similarMovies).toEqual(movies)
    })

    it('SET_MOVIES adds new movies and updates total results', () => {
        const initialMovies = [{ id: 1 }, { id: 2 }]
        state.allMovies = initialMovies

        const newMovies = [{ id: 3 }, { id: 4 }]

        mutations[MOVIES_MUTATIONS.SET_MOVIES](state, {
            movies: newMovies,
            totalResults: 100,
        })

        expect(state.allMovies).toEqual([...initialMovies, ...newMovies])
        expect(state.totalResults).toBe(100)
        expect(state.fetchedPages.has(state.tmdbPage)).toBe(true)
    })

    it('SET_MOVIES does not add duplicate movies for already fetched pages', () => {
        state.fetchedPages.add(state.tmdbPage)

        const payload = {
            movies: [{ id: 1 }, { id: 2 }],
            totalResults: 100,
        }

        mutations[MOVIES_MUTATIONS.SET_MOVIES](state, payload)

        expect(state.allMovies).toHaveLength(0)
    })

    it('CLEAR_MOVIES resets movies state', () => {
        state.allMovies = [{ id: 1 }, { id: 2 }]
        state.fetchedPages.add(1)

        mutations[MOVIES_MUTATIONS.CLEAR_MOVIES](state)

        expect(state.allMovies).toEqual([])
        expect(state.fetchedPages.size).toBe(0)
    })

    it('SET_PAGE updates current page', () => {
        mutations[MOVIES_MUTATIONS.SET_PAGE](state, 2)

        expect(state.currentPage).toBe(2)
    })

    it('SET_PAGE does not update current page', () => {
        mutations[MOVIES_MUTATIONS.SET_PAGE](state, 'testing')

        expect(state.currentPage).toBe(1)
    })

    it('SET_PER_PAGE updates items per page and resets current page', () => {
        state.currentPage = 3

        mutations[MOVIES_MUTATIONS.SET_PER_PAGE](state, 30)

        expect(state.perPage).toBe(30)
        expect(state.currentPage).toBe(1)
    })

    it('SET_PER_PAGE does not update per page and does not resets current page', () => {
        state.currentPage = 3

        mutations[MOVIES_MUTATIONS.SET_PER_PAGE](state, 'testing')

        expect(state.perPage).toBe(10)
        expect(state.currentPage).toBe(3)
    })

    it('SET_TMDB_PAGE updates TMDB page number', () => {
        mutations[MOVIES_MUTATIONS.SET_TMDB_PAGE](state, 3)
        expect(state.tmdbPage).toBe(3)
    })

    it('SET_TMDB_PAGE does not update TMDB page number', () => {
        mutations[MOVIES_MUTATIONS.SET_TMDB_PAGE](state, 'testing')
        expect(state.tmdbPage).toBe(1)
    })

    it('SET_FILTERS merges new filters and resets pagination', () => {
        state.currentPage = 3
        state.tmdbPage = 4

        const newFilters = { query: 'bat', year: 2023 }
        mutations[MOVIES_MUTATIONS.SET_FILTERS](state, newFilters)

        expect(state.filters).toEqual(newFilters)
        expect(state.currentPage).toBe(1)
        expect(state.tmdbPage).toBe(1)
    })

    it('SET_FILTERS preserves existing filter fields when partial update', () => {
        state.filters = { query: 'initial', year: 2022 }

        mutations[MOVIES_MUTATIONS.SET_FILTERS](state, { query: 'updated' })

        expect(state.filters).toEqual({ query: 'updated', year: 2022 })
    })
})

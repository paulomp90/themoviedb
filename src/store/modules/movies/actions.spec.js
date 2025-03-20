import { describe, beforeEach, it, expect, jest, afterEach } from '@jest/globals'
import actions from './actions'
import { MOVIES_MUTATIONS } from './mutations'
import { options } from '@/helpers/requests'

// Mock the options helper
jest.mock('@/helpers/requests', () => ({
    options: jest.fn(() => ({
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer mock-api-key',
        },
    })),
}))

describe('Movies Actions', () => {
    let commit
    let state

    beforeEach(() => {
        commit = jest.fn()
        state = {
            filters: {
                query: '',
                year: null,
            },
            tmdbPage: 1,
            perPage: 10,
            allMovies: [],
        }

        globalThis.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({}),
            }),
        )

        options.mockClear()
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('fetchMovieDetails', () => {
        const mockMovie = { id: 1, title: 'Test Movie' }

        beforeEach(() => {
            globalThis.fetch.mockResolvedValueOnce({
                json: () => Promise.resolve(mockMovie),
            })
        })

        it('should fetch movie details and commit them', async () => {
            await actions.fetchMovieDetails({ commit }, 1)

            expect(commit).toHaveBeenCalledWith(MOVIES_MUTATIONS.SET_MOVIE_DETAILS, mockMovie)
        })

        it('should throw error if no movie id provided', async () => {
            await expect(actions.fetchMovieDetails({ commit })).rejects.toThrow(
                'No movie id provided',
            )
        })

        it('should fetch movie details with correct options', async () => {
            await actions.fetchMovieDetails({ commit }, 1)

            expect(options).toHaveBeenCalled()
            expect(globalThis.fetch).toHaveBeenCalledWith(
                'https://api.themoviedb.org/3/movie/1?language=en-US',
                expect.objectContaining({
                    headers: expect.objectContaining({
                        Authorization: 'Bearer mock-api-key',
                    }),
                }),
            )
        })
    })

    describe('fetchSimilarMovies', () => {
        const mockSimilarMovies = {
            results: [
                { id: 1, title: 'Similar Movie 1' },
                { id: 2, title: 'Similar Movie 2' },
            ],
        }

        beforeEach(() => {
            globalThis.fetch.mockResolvedValueOnce({
                json: () => Promise.resolve(mockSimilarMovies),
            })
        })

        it('should fetch and commit similar movies', async () => {
            await actions.fetchSimilarMovies({ commit }, 1)

            expect(commit).toHaveBeenCalledWith(MOVIES_MUTATIONS.SET_LOADING, true)
            expect(commit).toHaveBeenCalledWith(
                MOVIES_MUTATIONS.SET_SIMILAR_MOVIES,
                mockSimilarMovies.results.slice(0, 5),
            )
            expect(commit).toHaveBeenCalledWith(MOVIES_MUTATIONS.SET_LOADING, false)
        })

        it('should fetch similar movies with correct options', async () => {
            await actions.fetchSimilarMovies({ commit }, 1)

            expect(options).toHaveBeenCalled()
            expect(globalThis.fetch).toHaveBeenCalledWith(
                'https://api.themoviedb.org/3/movie/1/similar',
                expect.objectContaining({
                    headers: expect.objectContaining({
                        Authorization: 'Bearer mock-api-key',
                    }),
                }),
            )
        })
    })

    describe('fetchMovies', () => {
        const mockMovies = {
            results: [{ id: 1, title: 'Test Movie' }],
            total_results: 1,
        }

        beforeEach(() => {
            globalThis.fetch.mockResolvedValueOnce({
                json: () => Promise.resolve(mockMovies),
            })
        })

        it('should not fetch if query is empty', async () => {
            await actions.fetchMovies({ commit, state })

            expect(fetch).not.toHaveBeenCalled()
        })

        it('should fetch movies with query', async () => {
            state.filters.query = 'test'

            await actions.fetchMovies({ commit, state })

            expect(commit).toHaveBeenCalledWith(MOVIES_MUTATIONS.SET_LOADING, true)
            expect(commit).toHaveBeenCalledWith(MOVIES_MUTATIONS.SET_MOVIES, {
                movies: mockMovies.results,
                totalResults: mockMovies.total_results,
            })
            expect(commit).toHaveBeenCalledWith(MOVIES_MUTATIONS.SET_LOADING, false)
        })

        it('should fetch movies with correct options when query exists', async () => {
            state.filters.query = 'test'

            await actions.fetchMovies({ commit, state })

            expect(options).toHaveBeenCalled()
            expect(globalThis.fetch).toHaveBeenCalledWith(
                expect.stringContaining('https://api.themoviedb.org/3/search/movie'),
                expect.objectContaining({
                    headers: expect.objectContaining({
                        Authorization: 'Bearer mock-api-key',
                    }),
                }),
            )
        })
    })

    describe('updateFilters', () => {
        it('should update filters and trigger fetch', () => {
            const dispatch = jest.fn()
            const newFilters = { query: 'new search', year: 2023 }

            actions.updateFilters({ commit, state, dispatch }, newFilters)

            expect(commit).toHaveBeenCalledWith(MOVIES_MUTATIONS.CLEAR_MOVIES)
            expect(commit).toHaveBeenCalledWith(MOVIES_MUTATIONS.SET_FILTERS, {
                ...state.filters,
                ...newFilters,
            })
            expect(dispatch).toHaveBeenCalledWith('fetchMovies')
        })
    })

    describe('updatePage', () => {
        it('should commit new page', () => {
            const dispatch = jest.fn()

            actions.updatePage({ commit, state, dispatch }, 2)

            expect(commit).toHaveBeenCalledWith(MOVIES_MUTATIONS.SET_PAGE, 2)
        })

        it('should fetch more movies when needed items exceed available items', () => {
            const dispatch = jest.fn()
            state.perPage = 5
            state.tmdbPage = 1
            state.allMovies = new Array(5)

            actions.updatePage({ commit, state, dispatch }, 5)

            expect(commit).toHaveBeenCalledWith(MOVIES_MUTATIONS.SET_PAGE, 5)
            expect(commit).toHaveBeenCalledWith(MOVIES_MUTATIONS.SET_TMDB_PAGE, 2)
            expect(dispatch).toHaveBeenCalledWith('fetchMovies')
        })

        it('should not fetch more movies when enough items are available', () => {
            const dispatch = jest.fn()
            state.perPage = 10
            state.tmdbPage = 1
            state.allMovies = new Array(25)

            actions.updatePage({ commit, state, dispatch }, 2)

            expect(commit).toHaveBeenCalledWith(MOVIES_MUTATIONS.SET_PAGE, 2)
            expect(commit).not.toHaveBeenCalledWith(
                MOVIES_MUTATIONS.SET_TMDB_PAGE,
                expect.any(Number),
            )
            expect(dispatch).not.toHaveBeenCalledWith('fetchMovies')
        })
    })

    describe('updatePerPage', () => {
        it('should commit new per page value', () => {
            actions.updatePerPage({ commit }, 20)

            expect(commit).toHaveBeenCalledWith(MOVIES_MUTATIONS.SET_PER_PAGE, 20)
        })
    })
})

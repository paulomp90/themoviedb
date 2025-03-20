import { describe, it, expect, beforeEach } from '@jest/globals'

import mutations from './mutations'

describe('User mutations', () => {
    let state

    beforeEach(() => {
        localStorage.clear()

        state = {
            favoriteMovies: [],
        }
    })

    describe('ADD_FAVORITE_MOVIE', () => {
        it('should add movie to favorites', () => {
            mutations.ADD_FAVORITE_MOVIE(state, 123)

            expect(state.favoriteMovies).toContain(123)
            expect(JSON.parse(localStorage.getItem('favoriteMovies'))).toContain(123)
        })

        it('should not add duplicate movie to favorites', () => {
            state.favoriteMovies = [123]

            mutations.ADD_FAVORITE_MOVIE(state, 123)

            expect(state.favoriteMovies).toHaveLength(1)
            expect(state.favoriteMovies).toContain(123)
        })
    })

    describe('REMOVE_FAVORITE_MOVIE', () => {
        it('should remove movie from favorites', () => {
            state.favoriteMovies = [123, 456]

            mutations.REMOVE_FAVORITE_MOVIE(state, 123)

            expect(state.favoriteMovies).not.toContain(123)
            expect(state.favoriteMovies).toContain(456)
            expect(JSON.parse(localStorage.getItem('favoriteMovies'))).not.toContain(123)
        })

        it('should handle removing non-existent movie', () => {
            state.favoriteMovies = [123]

            mutations.REMOVE_FAVORITE_MOVIE(state, 456)

            expect(state.favoriteMovies).toHaveLength(1)
            expect(state.favoriteMovies).toContain(123)
        })
    })
})

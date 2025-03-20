import { describe, it, expect, jest } from '@jest/globals'

import actions from './actions'

const movieId = 123
const commit = jest.fn()

describe('User Actions', () => {
    describe('toggleFavorite', () => {
        it('should add movie to favorites when not present', () => {
            const state = {
                favoriteMovies: [],
            }

            actions.toggleFavorite({ commit, state }, movieId)

            expect(commit).toHaveBeenCalledWith('ADD_FAVORITE_MOVIE', movieId)
        })

        it('should remove movie from favorites when already present', () => {
            const commit = jest.fn()

            const state = {
                favoriteMovies: [123],
            }

            actions.toggleFavorite({ commit, state }, movieId)

            expect(commit).toHaveBeenCalledWith('REMOVE_FAVORITE_MOVIE', movieId)
        })
    })
})

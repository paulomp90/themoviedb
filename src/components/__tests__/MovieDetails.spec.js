import { describe, it, expect, jest } from '@jest/globals'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import MovieDetails from '../MovieDetails.vue'

// Mock FavoriteButton component
const mockFavoriteButton = {
    name: 'FavoriteButton',
    template: '<button>Favorite</button>',
    props: ['movieId', 'action', 'detailsComponent'],
}

// Create a proper Vuex store
const store = createStore({
    modules: {
        user: {
            namespaced: true,
            state: () => ({
                favorites: [],
            }),
            getters: {
                getFavorites: (state) => state.favorites,
                isFavorite: (state) => (movieId) => state.favorites.includes(movieId),
            },
            actions: {
                toggleFavorite: jest.fn(),
            },
        },
    },
})

describe('MovieDetails', () => {
    const defaultProps = {
        id: 123,
        title: 'Test Movie',
        releaseDate: '2023-01-01',
        url: '/test-path.jpg',
        urlErrorFallback: '/fallback.jpg',
        overview: 'Test movie description',
        isFavorite: false,
    }

    const createWrapper = (props = defaultProps) => {
        return mount(MovieDetails, {
            props,
            global: {
                components: {
                    FavoriteButton: mockFavoriteButton,
                },
                plugins: [[store]], // Provide store as a plugin array
                mocks: {
                    $store: store,
                },
            },
        })
    }

    it('renders properly with all props', () => {
        const wrapper = createWrapper()

        expect(wrapper.find('h1').text()).toBe('Test Movie')
        expect(wrapper.find('img').attributes('src')).toBe(
            'https://image.tmdb.org/t/p/w500/test-path.jpg',
        )
        expect(wrapper.find('img').attributes('alt')).toBe('Test Movie')
        expect(wrapper.text()).toContain('Release Date: 2023-01-01')
        expect(wrapper.text()).toContain('Test movie description')
    })

    it('uses fallback image when url is undefined', () => {
        const wrapper = createWrapper({
            ...defaultProps,
            url: undefined,
        })

        expect(wrapper.find('img').attributes('onerror')).toBe(
            `this.src='${defaultProps.urlErrorFallback}'`,
        )
    })

    it('passes correct props to FavoriteButton', () => {
        const wrapper = createWrapper()

        const favoriteButton = wrapper.findComponent(mockFavoriteButton)
        expect(favoriteButton.exists()).toBe(true)
        expect(favoriteButton.props('movieId')).toBe(defaultProps.id)
        expect(favoriteButton.props('action')).toBe('user/toggleFavorite')
        expect(favoriteButton.props('detailsComponent')).toBe(true)
    })
})

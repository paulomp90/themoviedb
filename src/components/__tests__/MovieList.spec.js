import { describe, it, expect } from '@jest/globals'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import MovieList from '../MovieList.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: {},
        },
        {
            path: '/movie/:id',
            name: 'movie',
            component: {},
        },
    ],
})

describe('MovieList', () => {
    const mockMovies = [
        {
            id: 1,
            title: 'Test Movie',
            poster_path: '/test-poster.jpg',
            release_date: '2023-01-01',
            vote_average: 8.5,
        },
    ]

    it('renders correctly with movies', async () => {
        const wrapper = mount(MovieList, {
            global: {
                plugins: [router],
                stubs: {
                    MovieCard: true,
                    FavoriteButton: true,
                },
            },
            props: {
                movies: mockMovies,
                title: 'Test Movies',
            },
        })

        expect(wrapper.find('h2').text()).toBe('Test Movies')
        expect(wrapper.findAll('li')).toHaveLength(1)
    })

    it('renders correctly when movies list is empty', async () => {
        const wrapper = mount(MovieList, {
            global: {
                plugins: [router],
                stubs: {
                    MovieCard: true,
                    FavoriteButton: true,
                },
            },
            props: {
                movies: [],
                title: 'Test Movies',
            },
        })

        expect(wrapper.find('h2').text()).toBe('Test Movies')
        expect(wrapper.findAll('li')).toStrictEqual([])
    })

    it('applies correct classes to the movie list', () => {
        const customClass = 'custom-grid-class'
        const wrapper = mount(MovieList, {
            global: {
                plugins: [router],
                stubs: {
                    MovieCard: true,
                    FavoriteButton: true,
                    'transition-group': false,
                },
            },
            props: {
                movies: mockMovies,
                className: customClass,
            },
        })

        const movieList = wrapper.find('ul')

        expect(movieList.exists()).toBe(true)
        expect(movieList.attributes('class')).toContain(customClass)

        const wrapperNoClass = mount(MovieList, {
            global: {
                plugins: [router],
                stubs: {
                    MovieCard: true,
                    FavoriteButton: true,
                    'transition-group': false,
                },
            },
            props: {
                movies: mockMovies,
            },
        })

        const movieListNoClass = wrapperNoClass.find('ul')

        expect(movieListNoClass.exists()).toBe(true)
        expect(movieListNoClass.attributes('class') || '').not.toContain(customClass)
        expect(movieListNoClass.attributes('class')).toContain(
            'grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 mt-12',
        )
    })
})

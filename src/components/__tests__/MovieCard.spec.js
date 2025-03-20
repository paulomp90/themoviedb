import { describe, it, expect } from '@jest/globals'

import { mount } from '@vue/test-utils'
import MovieCard from '../MovieCard.vue'
import IconStar from '../icons/IconStar.vue'

describe('MovieCard', () => {
    const defaultProps = {
        id: 1,
        title: 'Test Movie',
        releaseDate: '2023-01-01',
        url: '/test-image.jpg',
        urlErrorFallback: '/fallback.jpg',
        voteAverage: 8.5,
    }

    const wrapper = mount(MovieCard, {
        props: defaultProps,
        global: {
            components: { IconStar },
        },
    })

    it('mounts properly', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('renders movie information correctly', () => {
        expect(wrapper.find('h3').text()).toBe('Test Movie')
        expect(wrapper.find('img').attributes('src')).toBe(
            'https://image.tmdb.org/t/p/w500/test-image.jpg',
        )
        expect(wrapper.find('img').attributes('alt')).toBe('Test Movie')
    })

    it('formats the release year correctly', () => {
        expect(wrapper.find('.text-gray-300').text()).toBe('2023')
    })

    it('formats vote average correctly', () => {
        expect(wrapper.find('.text-white.ml-1').text()).toBe('8.5')
    })
})

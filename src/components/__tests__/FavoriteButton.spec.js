import { describe, it, expect, beforeEach, jest } from '@jest/globals'

import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import FavoriteButton from '../FavoriteButton.vue'
import IconHeart from '../icons/IconHeart.vue'

describe('FavoriteButton', () => {
    let store
    const mockDispatch = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()

        store = createStore({
            modules: {
                user: {
                    namespaced: true,
                    state: {},
                    getters: {
                        isFavorite: () => jest.fn().mockReturnValue(false),
                    },
                },
            },
        })
        store.dispatch = mockDispatch
    })

    const createWrapper = (props = {}) => {
        return mount(FavoriteButton, {
            global: {
                plugins: [store],
                components: { IconHeart },
            },
            props: {
                movieId: 123,
                detailsComponent: false,
                action: 'user/toggleFavorite',
                ...props,
            },
        })
    }

    it('renders with correct initial state', () => {
        const wrapper = createWrapper()
        const heartIcon = wrapper.findComponent(IconHeart)

        expect(wrapper.exists()).toBe(true)
        expect(heartIcon.exists()).toBe(true)
        expect(heartIcon.props('filled')).toBe(false)
    })

    it('dispatches action when clicked', async () => {
        const wrapper = createWrapper()

        await wrapper.trigger('click')

        expect(mockDispatch).toHaveBeenCalledTimes(1)
        expect(mockDispatch).toHaveBeenCalledWith('user/toggleFavorite', 123)
    })

    it('renders a non-favorite item', () => {
        const wrapper = createWrapper()
        const heartIcon = wrapper.findComponent(IconHeart)

        expect(wrapper.classes('text-red-500')).toBe(false)
        expect(wrapper.classes('text-white')).toBe(true)
        expect(heartIcon.props('filled')).toBe(false)
    })

    it('renders a favorite item', () => {
        store = createStore({
            modules: {
                user: {
                    namespaced: true,
                    getters: {
                        isFavorite: () => jest.fn().mockReturnValue(true),
                    },
                },
            },
        })
        store.dispatch = mockDispatch

        const wrapper = createWrapper()
        const heartIcon = wrapper.findComponent(IconHeart)

        expect(wrapper.classes('text-red-500')).toBe(true)
        expect(wrapper.classes('text-white')).toBe(false)
        expect(heartIcon.props('filled')).toBe(true)
    })

    it('applies correct styles for details view', () => {
        const wrapper = createWrapper({ detailsComponent: true })

        expect(wrapper.classes()).toEqual(expect.arrayContaining(['w-6', 'h-6', 'mb-2']))
        expect(wrapper.classes('absolute')).toBe(false)
        expect(wrapper.classes('top-2')).toBe(false)
    })

    it('applies correct styles for non details view', () => {
        const wrapper = createWrapper()

        expect(wrapper.classes()).toEqual(
            expect.arrayContaining([
                'absolute',
                'top-2',
                'right-2',
                'p-2',
                'rounded-full',
                'bg-black/50',
                'hover:bg-black/70',
                'transition-colors',
                'duration-200',
                'z-10',
            ]),
        )
        expect(wrapper.classes('w-6')).toBe(false)
        expect(wrapper.classes('md:mb-4')).toBe(false)
    })
})

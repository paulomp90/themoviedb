import { describe, it, expect } from '@jest/globals'

import { mount } from '@vue/test-utils'
import MoviePagination from '../MoviePagination.vue'

describe('MoviePagination', () => {
    const createWrapper = (props = {}) => {
        return mount(MoviePagination, {
            props: {
                currentPage: 1,
                totalPages: 10,
                perPage: 10,
                ...props,
            },
        })
    }

    it('renders correctly', () => {
        const wrapper = createWrapper()

        expect(wrapper.find('select').exists()).toBe(true)
        expect(wrapper.findAll('button')).toHaveLength(2)
        expect(wrapper.text()).toContain('1 / 10')
    })

    it('disables previous button on first page', () => {
        const wrapper = createWrapper()
        const prevButton = wrapper.findAll('button')[0]

        expect(prevButton.attributes('disabled')).toBeDefined()
    })

    it('disables next button on last page', () => {
        const wrapper = createWrapper({ currentPage: 10 })
        const nextButton = wrapper.findAll('button')[1]

        expect(nextButton.attributes('disabled')).toBeDefined()
    })

    it('emits update:page event when clicking navigation buttons', async () => {
        const wrapper = createWrapper({ currentPage: 2 })

        await wrapper.findAll('button')[0].trigger('click')
        expect(wrapper.emitted('update:page')[0]).toEqual([1])

        await wrapper.findAll('button')[1].trigger('click')
        expect(wrapper.emitted('update:page')[1]).toEqual([3])
    })

    it('emits update:perPage event when changing per page value', async () => {
        const wrapper = createWrapper()
        const select = wrapper.find('select')

        await select.setValue('20')
        expect(wrapper.emitted('update:perPage')[0]).toEqual([20])
    })
})

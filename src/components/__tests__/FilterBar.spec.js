import { describe, it, expect, beforeEach } from '@jest/globals'
import { mount } from '@vue/test-utils'
import IconMagnifyingGlass from '../icons/IconMagnifyingGlass.vue'
import FilterBar from '../FilterBar.vue'

describe('FilterBar', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(FilterBar, {
            props: {
                filters: {
                    query: '',
                    year: null,
                },
            },
            global: {
                components: { IconMagnifyingGlass },
            },
        })
    })

    it('mounts properly', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('emits search query updates', async () => {
        const searchInput = wrapper.find('#search')
        await searchInput.setValue('test movie')

        const emitted = wrapper.emitted('update:filters')

        expect(emitted).toBeTruthy()
        expect(emitted[0][0]).toEqual({ query: 'test movie' })
    })

    it('emits year updates with number conversion', async () => {
        const yearInput = wrapper.find('#year-input')
        await yearInput.setValue('2023')

        const emitted = wrapper.emitted('update:filters')

        expect(emitted).toBeTruthy()
        expect(emitted[0][0]).toEqual({ year: 2023 })
    })

    it('converts invalid year input to null', async () => {
        const yearInput = wrapper.find('#year-input')
        await yearInput.setValue('invalid')

        const emitted = wrapper.emitted('update:filters')

        expect(emitted).toBeTruthy()
        expect(emitted[0][0]).toEqual({ year: null })
    })
})

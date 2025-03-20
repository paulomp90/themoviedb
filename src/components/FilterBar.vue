<script setup>
import IconMagnifyingGlass from '@/components/icons/IconMagnifyingGlass.vue'

defineProps({
    filters: {
        type: Object,
        required: true,
    },
})

const emit = defineEmits(['update:filters'])

const updateFilter = (key, value) => {
    const updatedValue = key === 'year' ? Number(value) || null : value
    emit('update:filters', { [key]: updatedValue })
}
</script>

<template>
    <div class="p-4 flex flex-wrap items-center gap-4 bg-gray-800/50 rounded-lg">
        <div class="flex flex-col gap-1 flex-1">
            <label for="search" class="text-base text-gray-400">Search</label>
            <div class="relative">
                <input
                    id="search"
                    :value="filters.query"
                    @input="(e) => updateFilter('query', e.target.value)"
                    placeholder="Search for a movie..."
                    class="w-full px-6 pr-12 py-3 rounded-lg border-2 border-gray-700 bg-gray-800 text-white placeholder-gray-400 hover:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <IconMagnifyingGlass
                    class="absolute right-4 top-[50%] -translate-y-[50%] text-gray-400 w-5 h-5 pointer-events-none"
                />
            </div>
        </div>
        <div class="flex flex-col gap-1">
            <label for="year-input" class="text-base text-gray-400">Release Year</label>
            <input
                id="year-input"
                type="number"
                :value="filters.year"
                @input="(e) => updateFilter('year', e.target.value)"
                placeholder="Year"
                class="px-6 py-3 w-32 rounded-lg border-2 border-gray-700 bg-gray-800 text-white placeholder-gray-400 hover:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
        </div>
    </div>
</template>

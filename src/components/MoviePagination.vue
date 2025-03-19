<script setup>
defineProps({
    currentPage: { type: Number, required: true },
    totalPages: { type: Number, required: true },
    perPage: { type: Number, required: true },
})

const perPageOptions = [5, 10, 20]
</script>

<template>
    <div
        class="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-800/50 p-4 rounded-lg backdrop-blur-sm"
    >
        <div class="flex items-center gap-4">
            <span class="text-gray-400">Per page:</span>
            <select
                :value="perPage"
                @change="$emit('update:perPage', parseInt($event.target.value))"
                class="bg-gray-700 text-white px-3 py-1.5 rounded-md border border-gray-600 hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors cursor-pointer"
            >
                <option v-for="option in perPageOptions" :key="option" :value="option">
                    {{ option }}
                </option>
            </select>
        </div>

        <div class="flex items-center gap-2">
            <button
                @click="$emit('update:page', currentPage - 1)"
                :disabled="currentPage === 1"
                class="px-3 py-1.5 rounded-md text-white bg-gray-700 border border-gray-600 hover:border-blue-500 disabled:opacity-50 disabled:hover:border-gray-600 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
                Previous
            </button>

            <span class="px-4 py-1.5 bg-gray-700 rounded-md border border-gray-600 text-white">
                {{ currentPage }} / {{ totalPages }}
            </span>

            <button
                @click="$emit('update:page', currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="px-3 py-1.5 rounded-md text-white bg-gray-700 border border-gray-600 hover:border-blue-500 disabled:opacity-50 disabled:hover:border-gray-600 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
                Next
            </button>
        </div>
    </div>
</template>

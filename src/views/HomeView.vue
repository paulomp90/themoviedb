<script setup>
import debounce from 'lodash/debounce'
import { useStore } from 'vuex'
import { computed } from 'vue'
import MovieList from '@/components/MovieList.vue'
import MoviePagination from '@/components/MoviePagination.vue'
import FilterBar from '@/components/FilterBar.vue'

const store = useStore()

const movies = computed(() => store.getters['movies/paginatedMovies'])
const totalPages = computed(() => store.getters['movies/totalFrontendPages'])

const currentPage = computed(() => store.state.movies.currentPage)
const perPage = computed(() => store.state.movies.perPage)
const loading = computed(() => store.state.movies.loading)
const filters = computed(() => store.state.movies.filters)

const handleFiltersChange = debounce((newFilters) => {
    store.dispatch('movies/updateFilters', newFilters)
}, 300)

// Pagination functions
const handlePageChange = (newPage) => {
    store.dispatch('movies/updatePage', newPage)
}

const handlePerPageChange = (newPerPage) => {
    store.dispatch('movies/updatePerPage', newPerPage)
}
</script>

<template>
    <div class="max-w-6xl mx-auto flex flex-col items-center gap-4">
        <FilterBar :filters="filters" @update:filters="handleFiltersChange" />

        <div v-if="loading" class="flex justify-center">
            <div
                class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
            ></div>
        </div>

        <MovieList
            v-if="movies.length > 0"
            :movies="movies"
            :key="currentPage"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        />
        <div v-else-if="!loading && filters.query" class="text-white">No movies found</div>

        <div v-if="movies.length > 0" class="w-full mt-8 mb-12">
            <MoviePagination
                :current-page="currentPage"
                :total-pages="totalPages"
                v-model:per-page="perPage"
                @update:page="handlePageChange"
                @update:perPage="handlePerPageChange"
            />
        </div>
    </div>
</template>

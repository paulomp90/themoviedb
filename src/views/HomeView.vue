<script setup>
import debounce from 'lodash/debounce'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import IconMagnifyingGlass from '@/components/icons/IconMagnifyingGlass.vue'
import MovieList from '@/components/MovieList.vue'
import MoviePagination from '@/components/MoviePagination.vue'

const store = useStore()
const searchQuery = ref('')
const selectedPerPage = ref(10)

const movies = computed(() => store.getters['movies/paginatedMovies'])
const currentPage = computed(() => store.state.movies.currentPage)
const totalPages = computed(() => store.getters['movies/totalFrontendPages'])

// Search function
const handleSearch = debounce(() => {
    store.dispatch('movies/updateQuery', searchQuery.value)
}, 300)

// Pagination functions
const handlePageChange = (newPage) => {
    store.dispatch('movies/updatePage', newPage)
}

const handlePerPageChange = (newPerPage) => {
    store.dispatch('movies/updatePerPage', newPerPage)
}

const loading = computed(() => store.state.movies.loading)
</script>

<template>
    <div class="max-w-6xl mx-auto flex flex-col items-center gap-4">
        <div class="mb-12 max-w-2xl mr-auto ml-auto">
            <div class="relative">
                <input
                    id="search"
                    v-model="searchQuery"
                    @input="handleSearch"
                    placeholder="Search for a movie..."
                    class="w-full px-6 py-3 rounded-full border-2 border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-xl"
                />
                <IconMagnifyingGlass />
            </div>
        </div>

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
        <div v-else-if="!loading" class="text-white">No movies found</div>

        <div v-if="movies.length > 0" class="w-full mt-8 mb-12">
            <MoviePagination
                :current-page="currentPage"
                :total-pages="totalPages"
                v-model:per-page="selectedPerPage"
                @update:page="handlePageChange"
                @update:perPage="handlePerPageChange"
            />
        </div>
    </div>
</template>

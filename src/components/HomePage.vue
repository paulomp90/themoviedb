<script setup>
import debounce from 'lodash/debounce'
import { useStore } from 'vuex'
import { computed, onMounted, ref, watch } from 'vue'
import IconMagnifyingGlass from '@/components/icons/IconMagnifyingGlass.vue'
import MovieCard from '@/components/MovieCard.vue'

const store = useStore()

const searchQuery = ref('')
const movies = computed(() => store.state.movies.movies)

const fetchMovies = debounce(() => {
    if (searchQuery.value) {
        store.dispatch('movies/searchMovies', searchQuery.value)
    } else {
        store.dispatch('movies/fetchPopularMovies')
    }
}, 300)

watch(searchQuery, fetchMovies)

onMounted(() => {
    store.dispatch('movies/fetchPopularMovies')
})

const loading = computed(() => store.state.movies.loading)
</script>

<template>
    <div class="max-w-6xl mx-auto flex flex-col items-center gap-4">
        <div class="mb-12 max-w-2xl mr-auto ml-auto">
            <div class="relative">
                <input
                    v-model="searchQuery"
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

        <transition-group
            name="movie-list"
            tag="ul"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
            <li
                v-for="movie in movies"
                :key="movie.id"
                class="bg-gray-800 rounded-xl shadow-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
            >
                <RouterLink class="aspect-w-2 aspect-h-3 relative" :to="`/movie/${movie.id}`">
                    <MovieCard
                        :poster_path="movie.poster_path"
                        :release_date="movie.release_date"
                        :vote_average="movie.vote_average"
                        url-error-fallback="https://placehold.co/500x750?text=No+Poster"
                        :title="movie.title"
                    />
                </RouterLink>
            </li>
        </transition-group>
    </div>
</template>

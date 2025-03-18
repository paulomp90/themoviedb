<script setup>
import debounce from 'lodash/debounce'
import { useStore } from 'vuex'
import { computed, onMounted, ref, watch } from 'vue'
import MagnifyingGlass from '@/assets/icons/magnifyingGlass.vue'
import Star from '@/assets/icons/star.vue'

const store = useStore()

const searchQuery = ref('')
const movies = computed(() => store.state.movies.movies)

const filteredMovies = computed(() => {
    return movies.value.filter((movie) => {
        return movie.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    })
})

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
    <div class="max-w-6xl mx-auto">
        <div class="mb-12 max-w-2xl mr-auto ml-auto">
            <div class="relative">
                <input
                    v-model="searchQuery"
                    placeholder="Search for a movie..."
                    class="w-full px-6 py-3 rounded-full border-2 border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-xl"
                />
                <MagnifyingGlass />
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
                v-for="movie in filteredMovies"
                :key="movie.id"
                class="bg-gray-800 rounded-xl shadow-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
            >
                <div class="aspect-w-2 aspect-h-3 relative">
                    <img
                        :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
                        :alt="movie.title"
                        class="object-cover w-full h-full"
                        onerror="this.src='https://via.placeholder.com/500x750?text=No+Poster'"
                    />
                    <div
                        class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                    >
                        <div class="absolute bottom-0 p-4">
                            <h3 class="text-lg font-bold text-white">{{ movie.title }}</h3>
                            <p class="text-sm text-gray-300">
                                {{ movie.release_date?.split('-')[0] }}
                            </p>
                            <div class="flex items-center mt-2">
                                <Star />
                                <span class="text-white ml-1">{{
                                    movie.vote_average?.toFixed(1)
                                }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </transition-group>
    </div>
</template>

<style scoped>
.movie-list-enter-active,
.movie-list-leave-active {
    transition: all 0.5s ease;
}
.movie-list-enter-from,
.movie-list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
</style>

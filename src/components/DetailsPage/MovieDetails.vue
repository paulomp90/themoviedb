<script setup>
import MovieCard from '../MovieCard.vue'
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

const movieDetails = computed(() => store.state.movies.movieDetails)

const title = computed(() => movieDetails.value?.title || 'No Title Available')
const releaseDate = computed(() => movieDetails.value?.release_date || 'No Release Date Available')
const description = computed(() => movieDetails.value?.description || 'No Description Available')
const posterImage = computed(() => movieDetails.value?.poster_path)
const similarMovies = computed(() => store.state.movies.similarMovies || [])

onMounted(() => {
    const id = route.params.id
    store.dispatch('movies/fetchMovieDetails', id)
    store.dispatch('movies/fetchSimilarMovies', id)
})
</script>

<template>
    <div class="flex flex-col gap-4 md:gap-8 p-4 md:p-8 max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row gap-4 md:gap-8">
            <div class="flex-shrink-0 mx-auto md:mx-0">
                <img
                    :src="`https://image.tmdb.org/t/p/w500${posterImage}`"
                    :alt="title"
                    class="w-[200px] md:w-[300px] rounded-lg shadow-md"
                    onerror="this.src='https://placehold.co/500x750?text=No+Poster'"
                />
            </div>
            <div class="flex-grow">
                <h1
                    class="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-center md:text-left text-gray-400"
                >
                    {{ title }}
                </h1>
                <div class="text-gray-500 mb-2 md:mb-4 text-center md:text-left">
                    Release Date: {{ releaseDate }}
                </div>
                <div class="leading-relaxed text-sm md:text-base text-gray-500">
                    {{ description }}
                </div>
            </div>
        </div>

        <!-- Similar Movies Section -->
        <div class="mt-4 md:mt-8">
            <h2 class="text-xl md:text-2xl font-bold mb-12 text-gray-400">Similar Movies</h2>
            <transition-group
                name="movie-list"
                tag="ul"
                class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 mt-12"
            >
                <li
                    v-for="movie in similarMovies"
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
    </div>
</template>

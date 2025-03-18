<script setup>
import MovieDetails from '@/components/MovieDetails.vue'
import MovieDetailsSimilar from '@/components/MovieList.vue'
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

const movieDetails = computed(() => store.state.movies.movieDetails)

const title = computed(() => movieDetails.value?.title || 'No title available')
const releaseDate = computed(() => movieDetails.value?.release_date || 'No release date available')
const overview = computed(() => movieDetails.value?.overview || 'No overview available')
const url = computed(() => movieDetails.value?.poster_path)
const similarMovies = computed(() => store.state.movies.similarMovies || [])

onMounted(() => {
    const id = route.params.id
    store.dispatch('movies/fetchMovieDetails', id)
    store.dispatch('movies/fetchSimilarMovies', id)
})
</script>

<template>
    <div class="flex flex-col gap-4 md:gap-8 p-4 md:p-8 max-w-7xl mx-auto">
        <RouterLink
            to="/"
            class="w-fit px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
            ← Back
        </RouterLink>

        <MovieDetails
            :url="url"
            :release-date="releaseDate"
            :overview="overview"
            url-error-fallback="https://placehold.co/500x750?text=No+Poster"
            :title="title"
        />

        <MovieDetailsSimilar :movies="similarMovies" title="Similar moveis" />
    </div>
</template>

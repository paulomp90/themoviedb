<script setup>
import MovieDetails from '@/components/MovieDetails.vue'
import MovieList from '@/components/MovieList.vue'
import { useStore } from 'vuex'
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const store = useStore()

const router = useRouter()
const route = useRoute()

const movieDetails = computed(() => store.state.movies.movieDetails)
const title = computed(() => movieDetails.value?.title || 'No title available')
const releaseDate = computed(() => movieDetails.value?.release_date || 'No release date available')
const overview = computed(() => movieDetails.value?.overview || 'No overview available')
const url = computed(() => movieDetails.value?.poster_path)

const similarMovies = computed(() => store.state.movies.similarMovies || [])

const goBack = () => {
    router.back()
}

const fetchData = (movieId) => {
    store.dispatch('movies/fetchMovieDetails', movieId)
    store.dispatch('movies/fetchSimilarMovies', movieId)
}

onMounted(() => {
    const id = route.params.id
    fetchData(id)
})

watch(
    () => route.params.id,
    (newId) => {
        if (newId) {
            fetchData(newId)
        }
    },
)
</script>

<template>
    <div class="flex flex-col gap-4 md:gap-8 p-4 md:p-8 max-w-7xl mx-auto">
        <RouterLink
            to="#"
            @click.prevent="goBack"
            class="w-fit px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
            ← Back
        </RouterLink>

        <MovieDetails
            :id="parseInt(route.params.id)"
            :url="url"
            :release-date="releaseDate"
            :overview="overview"
            url-error-fallback="https://placehold.co/500x750?text=No+Poster"
            :title="title"
            :is-favorite="store.getters['user/isFavorite'](route.params.id)"
        />

        <MovieList :movies="similarMovies" title="Similar moveis" />
    </div>
</template>

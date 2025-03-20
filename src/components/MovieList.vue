<script setup>
import { defineProps } from 'vue'
import { RouterLink } from 'vue-router'
import MovieCard from '@/components/MovieCard.vue'
import FavoriteButton from '@/components/FavoriteButton.vue'

defineProps({
    movies: {
        type: Array,
        required: true,
    },
    className: {
        type: String,
        default:
            'grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 mt-12',
    },
    title: String,
})
</script>

<template v-if="movies.length > 0">
    <div class="mt-4 md:mt-8">
        <h2 class="text-xl md:text-2xl font-bold mb-12 text-gray-400">{{ title }}</h2>
        <transition-group name="movie-list" tag="ul" :class="className">
            <li
                v-for="movie in movies"
                :key="movie.id"
                class="bg-gray-800 rounded-xl shadow-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
            >
                <div class="relative">
                    <FavoriteButton
                        :movie-id="movie.id"
                        action="user/toggleFavorite"
                        :details-component="false"
                    />
                    <RouterLink class="block aspect-w-2 aspect-h-3" :to="`/movie/${movie.id}`">
                        <MovieCard
                            :id="movie.id"
                            :url="movie.poster_path"
                            :release-date="movie.release_date"
                            :vote-average="movie.vote_average"
                            url-error-fallback="https://placehold.co/500x750?text=No+Poster"
                            :title="movie.title"
                        />
                    </RouterLink>
                </div>
            </li>
        </transition-group>
    </div>
</template>

<script setup>
import FavoriteButton from '@/components/FavoriteButton.vue'

defineProps({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: String,
        required: true,
    },
    url: String || undefined,
    urlErrorFallback: {
        type: String,
        required: true,
    },
    overview: {
        type: String,
        required: true,
    },
    isFavorite: {
        type: Boolean,
        required: true,
    },
})
</script>

<template>
    <div class="flex flex-col md:flex-row gap-4 md:gap-8">
        <div class="flex-shrink-0 mx-auto md:mx-0">
            <img
                :src="`https://image.tmdb.org/t/p/w500${url}`"
                :alt="title"
                class="w-[200px] md:w-[300px] rounded-lg shadow-md"
                :onerror="`this.src='${urlErrorFallback}'`"
            />
        </div>
        <div class="flex-grow">
            <div class="flex items-center justify-center md:justify-start gap-2">
                <h1
                    class="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-center md:text-left text-gray-400"
                >
                    {{ title }}
                </h1>
                <FavoriteButton
                    :movie-id="id"
                    action="user/toggleFavorite"
                    :details-component="true"
                />
            </div>

            <div class="text-gray-500 mb-2 md:mb-4 text-center md:text-left">
                Release Date: {{ releaseDate }}
            </div>
            <div class="leading-relaxed text-sm md:text-base text-gray-500">
                {{ overview }}
            </div>
        </div>
    </div>
</template>

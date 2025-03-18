<script setup>
import { extractYear } from '@/helpers/date'
import { formattedVote } from '@/helpers/number'
import IconStar from '@/components/icons/IconStar.vue'

defineProps({
    title: String,
    releaseDate: String,
    url: String,
    urlErrorFallback: String,
    voteAverage: Number,
})
</script>

<template>
    <img
        :src="`https://image.tmdb.org/t/p/w500${url}`"
        :alt="title"
        class="object-cover w-full h-full"
        onerror="this.src = 'urlErrorFallback'"
    />
    <div
        class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
    >
        <div class="absolute bottom-0 p-4">
            <h3 class="text-lg font-bold text-white">{{ title }}</h3>
            <p class="text-sm text-gray-300">
                {{ extractYear(releaseDate) }}
            </p>
            <div class="flex items-center mt-2">
                <IconStar />
                <span class="text-white ml-1">{{ formattedVote(voteAverage) }}</span>
            </div>
        </div>
    </div>
</template>

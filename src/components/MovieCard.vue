<script setup>
import { extractYear } from '@/helpers/date'
import { formattedVote } from '@/helpers/number'
import IconStar from '@/components/icons/IconStar.vue'

defineProps({
    id: {
        type: Number,
        required: true,
    },
    title: String,
    releaseDate: {
        type: String,
        required: true,
    },
    url: String || undefined,
    urlErrorFallback: {
        type: String,
        required: true,
    },
    voteAverage: {
        type: Number,
        required: true,
    },
})
</script>

<template>
    <div class="relative">
        <img
            :src="`https://image.tmdb.org/t/p/w500${url}`"
            :alt="title"
            class="object-cover w-full h-full"
            :onerror="`this.src='${urlErrorFallback}'`"
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
    </div>
</template>

<script setup>
defineProps({
    title: String,
    releaseDate: String,
    url: String,
    urlErrorFallback: String,
    overview: String,
})
</script>

<template>
    <div class="flex flex-col md:flex-row gap-4 md:gap-8">
        <div class="flex-shrink-0 mx-auto md:mx-0">
            <img
                :src="`https://image.tmdb.org/t/p/w500${url}`"
                :alt="title"
                class="w-[200px] md:w-[300px] rounded-lg shadow-md"
                onerror="this.src='urlErrorFallback'"
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
                {{ overview }}
            </div>
        </div>
    </div>
</template>

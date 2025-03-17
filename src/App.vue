<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
    <div class="flex flex-col min-h-screen">
        <header
            class="bg-gradient-to-r from-gray-800 to-gray-700 z-50 flex items-center justify-center p-6 shadow-lg"
        >
            <h1 class="text-4xl font-bold text-white text-center tracking-wide">Movie Database</h1>
        </header>

        <main
            class="flex-1 bg-gradient-to-br from-gray-900 to-gray-800 w-full flex items-center justify-center py-12 px-4"
        >
            <RouterView />
        </main>
    </div>
</template>

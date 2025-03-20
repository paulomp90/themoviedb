<script setup>
import { defineProps } from 'vue'
import { useStore } from 'vuex'
import IconHeart from '@/components/icons/IconHeart.vue'

const store = useStore()

defineProps({
    movieId: {
        type: Number,
        required: true,
    },
    detailsComponent: {
        type: Boolean,
        required: true,
    },
    action: {
        type: String,
        required: true,
    },
})
</script>

<template>
    <button
        @click="store.dispatch(action, movieId)"
        class="cursor-pointer"
        :class="{
            'w-6 h-6 mb-2 md:mb-4': detailsComponent,
            'absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors duration-200 z-10':
                !detailsComponent,
            'text-red-500': store.getters['user/isFavorite'](movieId),
            'text-white': !store.getters['user/isFavorite'](movieId),
        }"
    >
        <IconHeart :filled="store.getters['user/isFavorite'](movieId)" />
    </button>
</template>

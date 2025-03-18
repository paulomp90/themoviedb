import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/movie/:id',
            name: 'movie-details',
            props: (route) => ({ id: route.params.id }),
            component: () => import('../views/MovieDetailsView.vue'),
        },
    ],
})

export default router

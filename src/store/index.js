import { createStore } from 'vuex'
import movies from './modules/movies/index'
import user from './modules/user'

export default createStore({
    modules: {
        movies,
        user,
    },
})

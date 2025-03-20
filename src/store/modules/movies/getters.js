export default {
    paginatedMovies: (state) => {
        const startIndex = (state.currentPage - 1) * state.perPage
        const endIndex = startIndex + state.perPage
        return state.allMovies.slice(startIndex, endIndex)
    },
    totalFrontendPages: (state) => Math.ceil(state.totalResults / state.perPage),
}

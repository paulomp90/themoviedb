export const options = (method) => ({
    method: method ? method : 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
})

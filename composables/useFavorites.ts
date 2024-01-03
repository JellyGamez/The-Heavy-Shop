export default function  useFavorites() {
    const { status } = useAuth()

    const loggedIn = status.value === 'authenticated'
    
    function getIds() {
        if (process.client)
            return JSON.parse(localStorage.getItem('favorites') ?? '[]')
    }
    
    async function getItems() {
        if (loggedIn) {
            const { data } = await useFetch('/api/user/favorites')
            return data
        }
        else {
            const { data } = await useFetch('/api/guest/favorites', {
                query: {
                    ids: getIds()
                }
            })
            return data
        }
    }

    async function addItem(id: Number) {
        if (loggedIn) {
            await useFetch(`/api/user/favorites/${id}`, {
                method: 'POST'
            })
        }
        else if (process.client) {
            const favorites = getIds()

            if (!favorites.includes(id)) {
                favorites.push(id)
                localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)))
            }
        }
    }

    async function removeItem(id: Number) {
        if (loggedIn) {
            await useFetch(`/api/user/favorites/${id}`, {
                method: 'DELETE'
            })
        }
        else if (process.client) {
            const favorites = getIds()
            const index = favorites.indexOf(id)
            if (index !== -1) {
                favorites.splice(index, 1);
                localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)))
            }
        }
    }

    async function syncItems() {
        
    }

    return { getIds, getItems, syncItems, addItem, removeItem }
}

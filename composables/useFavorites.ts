import toast from '@/composables/useToast'

export default function useFavorites() {
    const loggedIn = useStatus()
    
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
            const ids = getIds()
            const { data } = await useFetch('/api/guest/favorites', {
                query: { ids: ids }
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
            const ids = getIds()
            if (!ids.includes(id)) {
                ids.push(id)
                localStorage.setItem('favorites', JSON.stringify(Array.from(ids)))
            }
        }
        toast("Item added to favorites")
    }

    async function removeItem(id: Number) {
        if (loggedIn) {
            await useFetch(`/api/user/favorites/${id}`, {
                method: 'DELETE'
            })
        }
        else if (process.client) {
            const ids = getIds()
            const index = ids.indexOf(id)
            if (index !== -1) {
                ids.splice(index, 1);
                localStorage.setItem('favorites', JSON.stringify(Array.from(ids)))
            }
        }
        toast("Item removed from favorites")
    }

    async function syncItems() {
        const ids = getIds()
        if (ids.length) {
            for (const id of ids) {
                await useFetch(`/api/user/favorites/${id}`, {
                    method: 'POST'
                })
            }
            localStorage.removeItem('favorites')
            toast("Your favorites have been synced!")
        }
    }

    return { getIds, getItems, syncItems, addItem, removeItem }
}

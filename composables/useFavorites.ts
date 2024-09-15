import { useToast } from 'vue-toastification'

const toast = useToast()

export default function useFavorites() {
    const loggedIn = useStatus()
    const bus = useEventBus('count')

    async function getIds() {
        if (loggedIn) {
            const { data } = await useFetch('/api/user/favorites')
            return (data.value as any).map((item: any) => item.id)
        }
        else if (import.meta.client) {
            return JSON.parse(localStorage.getItem('favorites') ?? '[]')
        }
    }

    async function getCount() {
        return (await getIds())?.length
    }
    
    async function getItems() {
        if (loggedIn) {
            const headers = useRequestHeaders(['cookie'])
            const { data } = await useFetch('/api/user/favorites', {
                query: useQuery(),
                headers
            })
            return data.value
        }
        else if (import.meta.client) {
            const ids = await getIds()
            const { data } = await useFetch('/api/guest/favorites', {
                query: { 
                    ids: ids,
                    ...useQuery()
                }
            })
            return data.value
        }
    }

    async function addItem(id: String) {
        if (loggedIn) {
            await useFetch('/api/user/favorites', {
                method: 'POST',
                query: {
                    ids: Array.of(id)
                }
            })
        }
        else if (import.meta.client) {
            const ids = await getIds()
            if (!ids.includes(id)) {
                ids.push(id)
                localStorage.setItem('favorites', JSON.stringify(Array.from(ids)))
            }
        }
        bus.emit('favorites')
        toast.success("Item added to favorites!")
    }

    async function removeItem(id: String) {
        if (loggedIn) {
            await useFetch('/api/user/favorites', {
                method: 'DELETE',
                query: {
                    id: id
                }
            })
        }
        else if (import.meta.client) {
            const ids = await getIds()
            const index = ids.indexOf(id)
            if (index !== -1) {
                ids.splice(index, 1)
                localStorage.setItem('favorites', JSON.stringify(Array.from(ids)))
            }
        }
        bus.emit('favorites')
        toast.success("Item removed from favorites!")
    }

    async function syncItems() {
        const ids = JSON.parse(localStorage.getItem('favorites') ?? '[]')
        if (ids.length) {
            await useFetch('/api/user/favorites', {
                method: 'POST',
                query: {
                    ids: ids
                }
            })
            localStorage.removeItem('favorites')
            bus.emit('favorites')
            return true
        }
        return false
    }

    return { getItems, getIds, getCount, syncItems, addItem, removeItem }
}

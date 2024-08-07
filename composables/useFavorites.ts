import { useToast } from 'vue-toastification'

const toast = useToast()

export default function useFavorites() {
    const sort = useSort()
    const loggedIn = useStatus()
    const bus = useEventBus('count')

    async function getIds() {
        if (loggedIn) {
            const { data } = await useFetch('/api/user/favorites')
            return (data.value as any).map((item: any) => item.id)
        }
        else if (process.client) {
            return JSON.parse(localStorage.getItem('favorites') ?? '[]')
        }
    }

    async function getCount() {
        return (await getIds())?.length
    }
    
    async function getItems() {
        if (loggedIn) {
            const headers = useRequestHeaders(['cookie'])
            const { data } = await useAsyncData('favorites', () => $fetch('/api/user/favorites', {
                query: sort.query(),
                headers,
            }))
            return data.value
        }
        else if (process.client) {
            const ids = await getIds()
            const { data } = await useAsyncData('favorites', () => $fetch('/api/guest/favorites', {
                query: { 
                    ids: ids,
                    ...sort.query()
                }
            }))
            return data.value
        }
    }

    async function addItem(id: String) {
        if (loggedIn) {
            await useFetch(`/api/user/favorites/${id}`, {
                method: 'POST'
            })
        }
        else if (process.client) {
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
            await useFetch(`/api/user/favorites/${id}`, {
                method: 'DELETE'
            })
        }
        else if (process.client) {
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
        const ids = await getIds()
        if (ids.length) {
            ids?.forEach(async (id: any) => {
                await useFetch(`/api/user/favorites/${id}`, {
                    method: 'POST'
                })
            })
            localStorage.removeItem('favorites')
            bus.emit('favorites')
            toast.success("Your favorites have been synced!")
        }
    }

    return { getItems, getIds, getCount, syncItems, addItem, removeItem }
}

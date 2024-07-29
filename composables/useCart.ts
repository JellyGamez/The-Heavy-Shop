import { useEventBus } from '@vueuse/core'
import { useToast } from 'vue-toastification'

const toast = useToast()

export default function useCart() {
    const loggedIn = useStatus()
    const bus = useEventBus('count')
    
    async function getIds() {
        if (loggedIn) {
            const { data } = await useFetch('/api/user/cart')
            return (data.value as any).map((item: any) => item.id)
        }
        else if (process.client) {
            return JSON.parse(localStorage.getItem('cart') ?? '[]')
        }
    }

    async function getCount() {
        return (await getIds())?.length
    }
    
    async function getItems() {
        if (loggedIn) {
            const { data } = await useFetch('/api/user/cart')
            return data.value
        }
        else if (process.client) {
            const ids = await getIds()
            const { data } = await useFetch('/api/guest/cart', {
                query: { ids: ids }
            })
            return data.value
        }
    }

    async function addItem(id: String) {
        if (loggedIn) {
            await useFetch(`/api/user/cart/${id}`, {
                method: 'POST'
            })
        }
        else if (process.client) {
            const ids = await getIds()
            if (!ids.includes(id)) {
                ids.push(id)
                localStorage.setItem('cart', JSON.stringify(Array.from(ids)))
            }
        }
        bus.emit('cart')
        toast.success("Item added to cart!")
    }

    async function removeItem(id: String) {
        if (loggedIn) {
            await useFetch(`/api/user/cart/${id}`, {
                method: 'DELETE'
            })
        }
        else if (process.client) {
            const ids = await getIds()
            const index = ids.indexOf(id)
            if (index !== -1) {
                ids.splice(index, 1)
                localStorage.setItem('cart', JSON.stringify(Array.from(ids)))
            }
        }
        bus.emit('cart')
        toast.success("Item removed from cart!")
    }

    async function syncItems() {
        const ids = await getIds()
        if (ids.length) {
            for (const id of ids) {
                await useFetch(`/api/user/cart/${id}`, {
                    method: 'POST'
                })
            }
            localStorage.removeItem('cart')
            bus.emit('cart')
            toast.success("Your cart has been synced!")
        }
    }

    return { getIds, getCount, getItems, syncItems, addItem, removeItem }
}

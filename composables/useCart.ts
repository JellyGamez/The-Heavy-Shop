import toast from '@/composables/useToast'

export default function useCart() {
    const loggedIn = useStatus()
    
    function getIds() {
        if (process.client)
            return JSON.parse(localStorage.getItem('cart') ?? '[]')
    }
    
    async function getItems() {
        if (loggedIn) {
            const { data } = await useFetch('/api/user/cart')
            return data
        }
        else {
            const ids = getIds()
            const { data } = await useFetch('/api/guest/cart', {
                query: { ids: ids }
            })
            return data
        }
    }

    async function addItem(id: String) {
        if (loggedIn) {
            await useFetch(`/api/user/cart/${id}`, {
                method: 'POST'
            })
        }
        else if (process.client) {
            const ids = getIds()
            if (!ids.includes(id)) {
                ids.push(id)
                localStorage.setItem('cart', JSON.stringify(Array.from(ids)))
            }
        }
        toast("Item added to cart")
    }

    async function removeItem(id: String) {
        if (loggedIn) {
            await useFetch(`/api/user/cart/${id}`, {
                method: 'DELETE'
            })
        }
        else if (process.client) {
            const ids = getIds()
            const index = ids.indexOf(id)
            if (index !== -1) {
                ids.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(Array.from(ids)))
            }
        }
        toast("Item removed from cart")
    }

    async function syncItems() {
        const ids = getIds()
        if (ids.length) {
            for (const id of ids) {
                await useFetch(`/api/user/cart/${id}`, {
                    method: 'POST'
                })
            }
            localStorage.removeItem('cart')
            toast("Your cart has been synced!")
        }
    }

    return { getIds, getItems, syncItems, addItem, removeItem }
}

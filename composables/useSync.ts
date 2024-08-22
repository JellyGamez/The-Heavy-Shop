import { useToast } from 'vue-toastification'

export default function useSync() {
    const toast = useToast()

    onMounted(async () => {
        if (localStorage.getItem('syncNeeded') === 'true') {
            await syncItems()
            localStorage.removeItem('syncNeeded')
        }
        if (localStorage.getItem('newAccount') === 'true') {
            toast.success('Account created successfully!')
            localStorage.removeItem('newAccount')
        }
    })

    async function syncItems() {
        const cart = await useCart().syncItems()
        const favorites = await useFavorites().syncItems()
        if (cart || favorites)
            toast.success('Your items have been synced!')
    }
}

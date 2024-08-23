import { useToast } from 'vue-toastification'

export default function useSync() {
    const toast = useToast()

    onMounted(() => {
        setTimeout(async () => {
            if (localStorage.getItem('syncNeeded') === 'true') {
                await syncItems()
                localStorage.removeItem('syncNeeded')
            }
            if (localStorage.getItem('newAccount') === 'true') {
                toast.success('Account created successfully!')
                localStorage.removeItem('newAccount')
            }
        }, 10)

    })

    async function syncItems() {
        const favorites = await useFavorites().syncItems()
        const cart = await useCart().syncItems()
        if (favorites || cart)
            toast.success('Your items have been synced!')
    }
}

export default function useQuery() {
    function get() {
        const router = useRouter()
        return {
            sortBy: router.currentRoute.value.query?.sortBy,
            direction: router.currentRoute.value.query?.direction,
            search: router.currentRoute.value.query?.search,
        }
    }

    return { get }
}

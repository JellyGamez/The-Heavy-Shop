export default function useQuery() {
    const router = useRouter()
    return {
        sortBy: router.currentRoute.value.query?.sortBy,
        direction: router.currentRoute.value.query?.direction,
        search: router.currentRoute.value.query?.search,
    }
}

export default function useSort() {
    function query() {
        const route = useRoute()
        return {
            page: route.query?.page,
            sortBy: route.query?.sortBy,
            direction: route.query?.direction
        }
    }

    return { query }
}

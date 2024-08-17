export default function useSort() {
    function query() {
        const route = useRoute()
        return {
            sortBy: route.query?.sortBy,
            direction: route.query?.direction
        }
    }

    return { query }
}

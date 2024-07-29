export default function useSort() {
    const rules = {
        'Default': null,
        'Newest': {
            createdAt: 'desc'
        },
        'Highest rated': {
            rating: 'desc'
        },
        'Number of reviews': {
            reviews: {
                _count: 'desc'
            }
        },
        'Price ascending': {
            price: 'asc'
        },
        'Price descending': {
            price: 'desc'
        }
    }
}

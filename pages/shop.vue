<script setup>

useHead({
    title: 'Shop',
    meta: [
        { name: 'description', content: 'Shop' }
    ],
})

const route = useRoute()

const page = computed(() => route.params.page ?? 1)
const { data: items } = await useFetch('/api/item', {
    query: { page: page.value ?? 1 }
})

const favorites = useFavorites()
const cart = useCart()

const userFavorites = ref(await favorites.getIds())

function isFavorite(id) {
    return userFavorites?.value?.some(item => item === id)
}

async function toggleFavorite(id) {
    if (isFavorite(id))
        await favorites.removeItem(id)
    else
        await favorites.addItem(id)
    userFavorites.value = await favorites.getIds()
}

async function addItemToCart(id) {
    await cart.addItem(id)
}

</script>

<template>
    <div>
        <div class="sm:ml-1 flex flex-col items-center sm:items-start text-white">
            <div class="flex items-center gap-1.5 lg:gap-2">
                <IconsShoppingBag class="size-6 lg:size-7" />
                <h1 class="text-2xl lg:text-3xl">
                    Shop
                </h1>
            </div>
            <p class="text-sm lg:text-base text-center">
                Explore and curate your metal haven
            </p>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3 mt-4 lg:mt-6 max-w-fit mx-auto">
            <GridItemCard v-for="item in items" :key="item.id" :item="{ ...item, favorite: isFavorite(item.id) }" 
                @toggleFavorite="toggleFavorite(item.id)"
                @addToCart="addItemToCart(item.id)"
            />
        </div>

    </div>
</template>

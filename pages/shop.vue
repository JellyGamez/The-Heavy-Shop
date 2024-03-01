<script setup>

useHead({
    title: 'Shop',
    meta: [
        { name: 'description', content: 'Shop' }
    ],
})

const route = useRoute()

const page = computed(() => route.query.page ?? 1)
const { data: items } = await useFetch('/api/items', {
    query: { page: page.value ?? 1 }
})

</script>

<template>
    <div>
        <div class="sm:ml-1 flex flex-col items-center sm:items-start text-white">
            <div class="flex items-center space-x-2">
                <IconsShoppingBag class="w-6 h-6 md:w-8 md:h-8" />
                <h1 class="text-2xl md:text-4xl text-white">
                    Shop
                </h1>
            </div>
            <p class="text-sm md:text-base text-center">
                Explore and curate your heavy metal haven
            </p>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3 mt-4 md:mt-6">
            <GridItemCard v-for="item in items" :key="item.id" :item="item" />
        </div>
    </div>
</template>

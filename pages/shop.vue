<script setup>

useHead({
    title: 'Shop',
    meta: [
        { name: 'description', content: 'Shop' }
    ],
})

definePageMeta({
    middleware: 'query-validation'
})

const route = useRoute()
const sort = useSort()

const { data: items } = await useAsyncData('items', () => $fetch('/api/item', {
    query: sort.query()
}))

const favorites = useFavorites()
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

const display = computed(() => route.query?.display ?? 'grid')

</script>

<template>
    <div>
        <div class="sm:ml-1 flex flex-wrap flex-col items-center sm:flex-row gap-x-10 gap-y-2.5 justify-between">
            <div class="flex flex-col items-center sm:items-start text-white">
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
            <div class="flex flex-wrap-reverse gap-2 md:gap-4 justify-center items-center text-white">
                <Sort @sort="async () => { await refreshNuxtData('items') }"/>
                <Display />
            </div>
        </div>
        <div class="mt-4 lg:mt-6">
            <div v-if="display === 'grid'" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3 max-w-fit mx-auto">
                <GridItemCard 
                    v-for="item in items" 
                    :key="item.id" 
                    :item="{ ...item, favorite: isFavorite(item.id) }" 
                    @toggleFavorite="toggleFavorite(item.id)"
                />
            </div>
            <div v-else-if="display === 'list'" class="flex flex-col gap-2 md:gap-3">
                <ListItemCard 
                    v-for="item in items" 
                    :key="item.id" 
                    :item="item"
                >
                    <template #actions>
                        <div class="hidden md:flex flex-col justify-center shrink-0 gap-2 mr-5 w-40">
                            <NuxtLink :to='`/item/${item.id}`'>
                                <Button 
                                    variant="secondary" 
                                    size="small"
                                > 
                                    <span> View item </span>
                                    <IconsDoubleChevronRight class="!size-3.5" />
                                </Button>
                            </NuxtLink>
                            <Button 
                                @click="toggleFavorite(item.id)"
                                aria-label="favorite"
                                size="small" 
                            > 
                                <ClientOnly>
                                    <IconsBookmark
                                        variant="solid"
                                        :class="[
                                            isFavorite(item.id) ? 'stroke-gray-lighter' : 'text-transparent stroke-white',
                                            '!size-5 transition duration-200'
                                        ]"
                                    />
                                    <template #fallback>
                                        <IconsBookmark
                                            variant="solid"
                                            class="text-transparent stroke-white !size-5 transition duration-200"
                                        />
                                    </template>
                                </ClientOnly>
                                {{ isFavorite(item.id) ? 'Remove' : 'Add' }}
                            </Button>
                        </div>
                        <div class="md:hidden absolute bottom-1 right-1">
                            <Button 
                                @click="toggleFavorite(item.id)" 
                                aria-label="favorite"
                                class="!p-2"
                            > 
                                <ClientOnly>
                                    <IconsBookmark
                                        variant="solid"
                                        :class="[
                                            isFavorite(item.id) ? 'stroke-gray-primary' : 'text-transparent stroke-white',
                                            '!size-[18px] transition duration-200'
                                        ]"
                                    />
                                    <template #fallback>
                                        <IconsBookmark
                                            variant="solid"
                                            class="text-transparent stroke-white !size-[18px] transition duration-200"
                                        />
                                    </template>
                                </ClientOnly>
                            </Button>
                        </div>
                    </template>
                </ListItemCard>
            </div>
        </div>
    </div>
</template>

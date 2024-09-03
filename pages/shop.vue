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
const router = useRouter()
const query = useQuery()

const page = ref(1)
const loading = ref(false)

const { data } = await useFetch('/api/item', {
    query: {
        page: page.value,
        ...query.get()
    }
})

async function refresh() {
    page.value = 1
    const { data: newData } = await useFetch('/api/item', {
        query: {
            page: page.value,
            ...query.get()
        }
    })
    data.value = newData.value
}

const items = computed(() => data.value.items)
const count = computed(() => data.value.count)

const searchBus = useEventBus('search')
searchBus.on(refresh)

const display = computed(() => route.query?.display ?? 'grid')

const favorites = useFavorites()
const userFavorites = ref(await favorites.getIds())

function isFavorite(id) {
    return userFavorites?.value?.some(item => item === id)
}

const toggleFavorite = useDebounceFn(async (id) => {
    if (isFavorite(id))
        await favorites.removeItem(id)
    else
        await favorites.addItem(id)
    userFavorites.value = await favorites.getIds()
})

async function goBack() {
    router.back()
    setTimeout(async () => await refresh(), 10)
}

const { y } = useWindowScroll()

watch(y, async (newValue) => {
    console.info('here')
    if (
        Math.round(newValue) + window.innerHeight + 60 >= document.body.scrollHeight && 
        data.value.items.length < data.value.count
    ) {
        page.value += 1
        loading.value = true
        let { data: newData } = await useFetch('/api/item', {
            query: {
                page: page.value,
                ...query.get()
            }
        })
        data.value.items.push(...newData.value.items)
        loading.value = false
    }
})

</script>

<template>
    <div>
        <Banner
            icon="shopping-bag"
            title="Shop"
            :description="route.query.search ? `We found <span class='text-red-light'> ${count} ${count === 1 ? 'result' : 'results'} </span> for &quot${route.query.search}&quot` : 
                `<p>Browse <span class='text-red-light'> over 300 items </span> from our collection</p>`
            "
        >
            <div class="flex flex-wrap gap-2 md:gap-4 justify-center items-center text-white">
                <div v-if="items.length" class="flex flex-wrap-reverse justify-center gap-2 md:gap-4">
                    <Sort @sort="refresh" />
                    <Display />
                </div>
            </div>
        </Banner>
        <div class="mt-4 lg:mt-6">
            <EmptyState 
                v-if="!items.length"
                title="No results found"
                description="There are no items that match your search and filter options."
            >
                <Button
                    @click="goBack"
                    variant="secondary" 
                    size="small" 
                    class="mt-1 max-w-32 sm:max-w-40 w-full"
                > 
                    <span> GO BACK </span>
                    <IconsDoubleChevronRight class="!size-4" />
                </Button>
            </EmptyState>
            <div 
                v-if="display === 'grid'" 
                class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3 place-items-center mx-auto w-fit md:w-auto"
            >
                <GridItemCard 
                    v-for="item in items" 
                    :key="item.id" 
                    :item="item" 
                >
                    <Button 
                        @click="toggleFavorite(item.id)"
                        aria-label="favorite"
                        class="absolute top-0.5 right-0.5 md:top-1 md:right-1 !p-1.5 h-fit !w-fit !ring-0"
                    > 
                        <ClientOnly>
                            <IconsBookmark
                                variant="solid"
                                :class="[
                                    isFavorite(item.id) ? 'stroke-gray-primary' : 'text-transparent stroke-white',
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
                    </Button>
                </GridItemCard>
            </div>
            <div 
                v-else-if="display === 'list'" 
                class="flex flex-col gap-2 md:gap-3"
            >
                <ListItemCard 
                    v-for="item in items" 
                    :key="item.id" 
                    :item="item"
                >
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
                            class="!p-[7px]"
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
                </ListItemCard>
            </div>
            <div 
                v-if="loading"
                class="flex w-full items-center justify-center gap-1"
            >
                <IconsSpinner class="size-5 text-white animate-spin mr-1" />
                <h1 class="text-xl text-center text-white py-10">
                    Loading more items...
                </h1>
            </div>
        </div>
    </div>
</template>

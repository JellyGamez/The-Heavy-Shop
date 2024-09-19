<script setup>

useHead({
    title: 'Favorites'
})

definePageMeta({
    middleware: 'query-validation'
})

const loggedIn = useStatus()
const favorites = useFavorites()

const items = ref(await favorites.getItems())

const syncBus = useEventBus('sync')
syncBus.on(async function() {
    items.value = await favorites.getItems()
})

const removeItem = useDebounceFn(async (id) => {
    const index = items.value.findIndex(item => item.id === id)
    items.value.splice(index, 1)
    await favorites.removeItem(id)
})

</script>

<template>
    <div>
        <Banner
            icon="bookmark"
            title="Favorites"
            description="Bookmark your favorite items for later"
        >
            <Sort 
                v-if="items?.length !== 0"
                @sort="async () => { items = await favorites.getItems() }"
            />
        </Banner>
        <div class="mt-4 lg:mt-6">
            <ClientOnly>
                <div 
                    v-if="!loggedIn && items?.length" 
                    class="flex flex-col gap-2 md:gap-3"
                >
                    <AuthPrompt>
                        <p class="mx-8 sm:mx-0">
                            To save your favorite items, please log in or create an account. 
                        </p>
                        <p class="hidden md:block">
                            Your preferences will be stored for future visits. 
                        </p>
                    </AuthPrompt>
                    <Separator class="!py-2" />
                </div>
                <div 
                    v-if="items?.length" 
                    class="flex flex-col mt-2 gap-2 md:mt-3 md:gap-3"
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
                                @click="removeItem(item.id)"
                                size="small" 
                            > 
                                <IconsTrashBin class="!size-5" />
                                <span> Remove </span>
                            </Button>
                        </div>
                        <div class="md:hidden absolute bottom-1 right-1">
                            <Button 
                                @click="removeItem(item.id)" 
                                aria-label="remove"
                                class="!p-[7px]" 
                            > 
                                <IconsTrashBin class="!size-[18px]" />
                            </Button>
                        </div>
                    </ListItemCard>
                </div>
                <EmptyState 
                    v-else-if="!items?.length"
                    title="No favorite items yet"
                    description="
                        <p>
                            You haven't added any items to your favorites yet.
                        </p>
                        <p class='hidden md:block'>
                            Start browsing our store and find the perfect items to add to your collection.
                        </p>
                    "
                >
                    <NuxtLink to="/shop" class="max-w-32 sm:max-w-40 w-full">
                        <Button 
                            variant="secondary" 
                            size="small" 
                            class="mt-1"
                        > 
                            <span> SHOP NOW </span>
                            <IconsDoubleChevronRight class="!size-4" />
                        </Button>
                    </NuxtLink>
                </EmptyState>
                <template #fallback>
                    <div class="flex w-full items-center justify-center gap-1 py-4 md:py-10">
                        <IconsSpinner class="size-5 text-white animate-spin mr-1" />
                        <h1 class="text-xl text-center text-white">
                            Loading items...
                        </h1>
                    </div>
                </template>
            </ClientOnly>
        </div>
    </div>
</template>

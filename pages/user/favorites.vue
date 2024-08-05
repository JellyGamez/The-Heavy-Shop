<script setup>

useHead({
    title: 'Favorites',
    meta: [
        { name: 'description', content: 'Favorites' }
    ],
})

definePageMeta({
    middleware: 'query-validation'
})

const loggedIn = useStatus()
const favorites = useFavorites()

const items = ref(await favorites.getItems())

async function removeItem(id) {
    await favorites.removeItem(id)
    items.value = await favorites.getItems()
}

</script>

<template>
    <div>
        <div class="sm:ml-1 flex flex-wrap flex-col items-center sm:flex-row gap-x-10 gap-y-2.5 justify-between">
            <div class=" flex flex-col items-center sm:items-start text-white">
                <div class="flex items-center gap-1.5 lg:gap-2">
                    <IconsBookmark class="size-6 lg:size-7" />
                    <h1 class="text-2xl lg:text-3xl">
                        Favorites
                    </h1>
                </div>
                <p class="text-sm lg:text-base text-center">
                    Bookmark your favorite items for later
                </p>
            </div>
            <Sort 
                v-if="items?.length" 
                @sort="async () => { items = await favorites.getItems() }" 
            />
        </div>

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
                    <Separator />
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
                                    aria-label="delete"
                                    class="!p-2" 
                                > 
                                    <IconsTrashBin class="!size-[18px]" />
                                </Button>
                            </div>
                        </template>
                    </ListItemCard>
                </div>
                <EmptyState v-else-if="items">
                    <template #title>
                        No favorite items yet
                    </template>
                    <template #content>
                        <p>
                            Your favorites collection is currently awaiting your personal touch.
                        </p>
                        <p class="hidden md:block">
                            Explore our store, discover standout items, and build your distinguished favorites selection.
                        </p>
                    </template>
                    <template #action>
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
                    </template>
                </EmptyState>
                <template #fallback>
                    <div class="flex w-full items-center justify-center gap-1">
                        <IconsSpinner class="size-5 text-white animate-spin mr-1" />
                        <h1 class="text-xl text-center text-white py-10">
                            Loading items...
                        </h1>
                    </div>
                </template>
            </ClientOnly>
        </div>
    </div>
</template>

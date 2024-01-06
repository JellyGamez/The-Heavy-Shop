<script setup>

useHead({
    title: 'Favorites',
    meta: [
        { name: 'description', content: 'Favorites' }
    ],
})

const { status } = useAuth()

const loggedIn = computed(() => {
    return status.value === 'authenticated'
})

const favorites = useFavorites()
const favoritesList = ref(await favorites.getItems())

async function removeItem(id) {
    await favorites.removeItem(id)
    const data = await favorites.getItems()
    favoritesList.value = data.value
}

</script>

<template>
    <div>
        <div class="flex flex-col items-center sm:items-start text-white">
            <div class="flex items-center space-x-2">
                <IconsBookmark class="w-6 h-6 md:w-8 md:h-8 md:mt-0.5" />
                <h1 class="text-2xl md:text-4xl text-white">
                    Favorites
                </h1>
            </div>
            <p class="text-sm md:text-base text-center">
                Bookmark your favorite items here
            </p>
        </div>
        <AuthPrompt v-if="!loggedIn && favoritesList?.length" class="mt-6">
            <p>
                To save your favorite items, please log in or create an account. 
            </p>
            <p class="hidden md:block">
                Your preferences will be stored for future visits. 
            </p>
        </AuthPrompt>
        <ClientOnly>
            <div v-if="favoritesList?.length" class="flex flex-col mt-4 space-y-4">
                <ExtendedItemCard v-for="item in favoritesList" :item="item">
                    <template #actions>
                        <div class="flex flex-col gap-2 justify-center mr-4 shrink-0 w-40">
                            <Button variant="secondary" class="flex items-center justify-center space-x-1" > 
                                <IconsShoppingCart class="!w-5 !h-5" />
                                <span> Add to cart </span>
                            </Button>
                            <Button variant="primary" class="flex items-center justify-center space-x-1" @click="removeItem(item.id)"> 
                                <IconsTrashBin class="!w-5 !h-5" />
                                <span> Remove </span>
                            </Button>
                        </div>
                    </template>
                </ExtendedItemCard>
            </div>
            <EmptyState v-else-if="favoritesList" class="mt-6">
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
            </EmptyState>

            <template #fallback>
                <h1 class="text-xl text-center text-white py-10">
                    Loading items...
                </h1>
            </template>
        </ClientOnly>
    </div>
</template>

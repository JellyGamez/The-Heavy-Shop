<script setup>

useHead({
    title: 'Favorites',
    meta: [
        { name: 'description', content: 'Favorites' }
    ],
})

const loggedIn = useStatus()

const cart = useCart()
const favorites = useFavorites()
const favoriteItems = ref(await favorites.getItems())

async function removeItem(id) {
    await favorites.removeItem(id)
    favoriteItems.value = await favorites.getItems()
}

async function addItemToCart(id) {
    await cart.addItem(id)
}

</script>

<template>
    <div>
        <div class="sm:ml-1 flex flex-col items-center sm:items-start text-white">
            <div class="flex items-center gap-1.5 lg:gap-2">
                <IconsBookmark class="size-6 lg:size-7" />
                <h1 class="text-2xl lg:text-3xl">
                    Favorites
                </h1>
            </div>
            <p class="text-sm lg:text-base text-center">
                Bookmark your favorite items here
            </p>
        </div>
        <div class="mt-4 lg:mt-6">
            <ClientOnly>
                <div v-if="!loggedIn && favoriteItems?.length" class="flex flex-col gap-2 md:gap-3">
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

                <div v-if="favoriteItems?.length" class="flex flex-col mt-2 gap-2 md:mt-3 md:gap-3">
                    <ListItemCard v-for="item in favoriteItems" :key="item.id" :item="item">
                        <template #actions>
                            <div class="hidden md:flex flex-col justify-center shrink-0 gap-2 mr-5 w-40">
                                <Button variant="secondary" size="small" @click="addItemToCart(item.id)"> 
                                    <IconsShoppingCart class="!w-5 !h-5" />
                                    <span> Add to cart </span>
                                </Button>
                                <Button size="small" @click="removeItem(item.id)"> 
                                    <IconsTrashBin class="!w-5 !h-5" />
                                    <span> Remove </span>
                                </Button>
                            </div>
                            <div class="md:hidden absolute bottom-1 right-1">
                                <Button size="small" class="!p-2.5" @click="removeItem(item.id)"> 
                                    <IconsTrashBin class="!w-4 !h-4" />
                                </Button>
                            </div>
                        </template>
                    </ListItemCard>
                </div>

                <EmptyState v-else-if="favoriteItems">
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
                    <div class="flex w-full items-center justify-center gap-1">
                        <IconsSpinner class="w-5 h-5 text-white animate-spin mr-1" />
                        <h1 class="text-xl text-center text-white py-10">
                            Loading items...
                        </h1>
                    </div>
                </template>
            </ClientOnly>
        </div>
    </div>
</template>

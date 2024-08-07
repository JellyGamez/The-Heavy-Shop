<script setup>

useHead({
    title: 'Cart',
    meta: [
        { name: 'description', content: 'Cart' }
    ],
})

definePageMeta({
    middleware: 'query-validation'
})

const loggedIn = useStatus()

const cart = useCart()
const items = ref(await cart.getItems())

async function removeItem(id, size) {
    await cart.removeItem(id, size)
    items.value = await cart.getItems()
}

async function updateItem(item, type) {
    await cart.updateItem(item.id, item.size, item.quantity, type)
    items.value = await cart.getItems()
}

</script>

<template>
    <div>
        <div class="sm:ml-1 flex flex-wrap flex-col items-center sm:flex-row gap-x-10 gap-y-2.5 justify-between">
            <div class=" flex flex-col items-center sm:items-start text-white">
                <div class="flex items-center gap-1.5 lg:gap-2">
                    <IconsShoppingCart class="size-6 lg:size-7" />
                    <h1 class="text-2xl lg:text-3xl">
                        Cart
                    </h1>
                </div>
                <p class="text-sm lg:text-base text-center">
                    Organize your selected items for checkout
                </p>
            </div>
            <Sort 
                v-if="items?.length" 
                @sort="async () => { items = await cart.getItems() }" 
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
                            To save your cart, please log in or create an account. 
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
                        :key="`${item.id}${item.size}`"
                        :item="item"
                    >
                        <template #actions>
                            <div class="hidden md:flex flex-col justify-center shrink-0 gap-2 mr-5 w-40 text-white">
                                <div class="flex items-center gap-5">
                                    <Button 
                                        @click="updateItem(item, 'decrement')"
                                        aria-label="decrement"
                                        class="h-10"
                                    >
                                        <IconsMinus />
                                    </Button>
                                    <span class="flex justify-center text-xl w-3.5 shrink-0"> {{ item.quantity }} </span>
                                    <Button 
                                        @click="updateItem(item, 'increment')"
                                        aria-label="increment"
                                        class="h-10"
                                    >
                                        <IconsPlus />
                                    </Button>
                                </div>
                                <Button
                                    @click="removeItem(item.id, item.size)"
                                    size="small" 
                                > 
                                    <IconsTrashBin class="!size-5" />
                                    <span> Remove </span>
                                </Button>
                            </div>
                            <div class="text-white md:hidden absolute bottom-1 right-1">
                                <div class="flex items-center gap-2">
                                    <Button 
                                        @click="updateItem(item, 'decrement')"
                                        aria-label="decrement"
                                        class="!p-2"
                                    >
                                        <IconsMinus />
                                    </Button>
                                    <span class="flex justify-center w-3.5 shrink-0"> {{ item.quantity }} </span>
                                    <Button 
                                        @click="updateItem(item, 'increment')"
                                        aria-label="increment"
                                        class="!p-2"
                                    >
                                        <IconsPlus />
                                    </Button>
                                </div>
                            </div>
                        </template>
                    </ListItemCard>
                </div>
                <EmptyState 
                    v-else-if="items"
                    title="Your cart is empty"
                    description="
                        <p>
                            It looks like you haven't added any items to your cart yet.
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

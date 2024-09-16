<script setup>

import { useToast } from 'vue-toastification'

useHead({
    title: 'Cart'
})

definePageMeta({
    middleware: 'query-validation'
})

const loggedIn = useStatus()

const toast = useToast()
const cart = useCart()
const items = ref(await cart.getItems())

const subtotal = ref(items.value?.map(item => item.price * item.quantity).reduce((x, y) => x + y, 0).toFixed(2))
const count = ref(await cart.getCount())

const countBus = useEventBus('count')
countBus.on(async function(event) {
    if (event === 'cart')
        count.value = await cart.getCount()
})

const syncBus = useEventBus('sync')
syncBus.on(async function() {
    items.value = await cart.getItems()
})

const removeItem = useDebounceFn(async (id, size) => {
    const index = items.value.findIndex(item => item.id === id && item.size === size)
    count.value = count.value - items.value[index].quantity
    subtotal.value = Number.parseFloat(subtotal.value - items.value[index].quantity * items.value[index].price).toFixed(2)
    items.value.splice(index, 1)
    await cart.removeItem(id, size)
})

const updateItem = useDebounceFn(async (item, type) => {
    try {
        const index = items.value.findIndex(_item => _item.id === item.id && _item.size === item.size)
        await cart.updateItem(item.id, item.size, item.quantity, type)

        if (type === 'decrement') {
            count.value = count.value - 1
            subtotal.value = Number.parseFloat(subtotal.value - items.value[index].price).toFixed(2)
            if (item.quantity <= 1)
                items.value.splice(index, 1)
            else
                items.value[index].quantity -= 1
        }
        else if (type === 'increment') {
            if (item.quantity < 10) {
                count.value = count.value + 1
                subtotal.value = (Number.parseFloat(subtotal.value) + items.value[index].price).toFixed(2)
                items.value[index].quantity += 1
            }
        }
    }
    catch(e) {
        toast.error(e.statusMessage)
    }
})

</script>

<template>
    <div>
        <Banner
            icon="shopping-cart"
            title="Cart"
            description="Organize your selected items for checkout"
        >
            <Sort 
                v-if="items?.length !== 0"
                @sort="async () => { items = await cart.getItems() }"
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
                            To save your cart, please log in or create an account. 
                        </p>
                        <p class="hidden md:block">
                            Your preferences will be stored for future visits. 
                        </p>
                    </AuthPrompt>
                    <Separator class="!py-2" />
                </div>
                <div 
                    v-if="loggedIn && items?.length" 
                    class="flex flex-col gap-2 md:gap-3"
                >
                    <div class="flex flex-col sm:flex-row items-center gap-y-2 gap-x-3 p-3 pl-4 w-full rounded-2xl bg-gray-dark text-white">
                        <IconsDocument class="hidden sm:block !size-9 shrink-0" />
                        <div class="w-full flex flex-col sm:flex-row gap-x-6 gap-y-1 items-center">
                            <div class="text-lg -mt-1 flex flex-col items-center sm:items-start font-light">
                                <span> Subtotal ({{ count }} {{ count === 1 ? 'item' : 'items' }}) </span>
                                <span class="text-sm -my-0.5 text-gray-lightest">
                                    Includes taxes and free shipping
                                </span>
                            </div>
                            <div class="text-2xl sm:text-3xl">
                                <span class="font-extralight">$</span>
                                <span class=""> {{ subtotal }} </span>
                            </div>
                        </div>
                        <NuxtLink to="/user/checkout">
                            <Button 
                                variant="secondary" 
                                size="small"
                                class="!w-44 shrink-0"
                            >
                                CHECKOUT
                                <IconsDoubleChevronRight class="!size-4" />
                            </Button>
                        </NuxtLink>
                    </div>
                    <Separator class="!py-2" />
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
                    </ListItemCard>
                </div>
                <EmptyState 
                    v-else-if="items?.length === 0"
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

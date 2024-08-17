<script setup>

import { useToast } from 'vue-toastification'

const props = defineProps({
    item: Object,
    isFavorite: Boolean
})

const route = useRoute()
const toast = useToast()

const cart = useCart()

const size = ref()
let date = new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
}).split(' ')
date = date[0] + ', ' + date[1] + ' ' + date[2]

const addToCart = useDebounceFn(async () => {
    try {
        await cart.addItem(route.params.id, size.value)
    } 
    catch(e) {
        toast.error(e.statusMessage)
    }
})

</script>

<template>
    <div class="grid grid-cols-4 gap-2 md:gap-3">
        <div class="flex flex-col sm:flex-row col-span-4 xl:col-span-3 p-1 md:p-1.5 bg-gray-dark rounded-2xl">
            <NuxtImg 
                :src="item.photoUrl" 
                :alt="item.name" 
                class="w-full sm:size-[320px] md:size-[360px] lg:size-[420px] object-cover rounded-xl" 
                preload
            />
            <div class="flex flex-col justify-center gap-1 md:gap-2 lg:gap-6 text-white py-5 sm:py-4 px-5 md:pl-6">
                <div class="flex flex-col gap-1 sm:gap-2">
                    <h1 class="text-xl lg:text-2xl text-white">
                        {{ item.name }}
                    </h1>

                    <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <p class="text-lg lg:text-xl"> 
                            {{ parseFloat(item.rating).toFixed(2) }}
                        </p>
                        <Rating :rating="item.rating" class="mb-0.5" />
                        <p class="lg:text-lg text-gray-lightest"> 
                            ({{ item.reviews.length }} 
                            {{ item.reviews.length === 1 ? 'review' : 'reviews' }}) 
                        </p>
                    </div>
                </div>

                <div class="flex flex-col">
                    <p class="text-lg lg:text-xl w-full"> 
                        Description
                    </p>
                    <p class="lg:text-lg font-light text-gray-lightest w-full"> 
                        {{ item.description }} 
                    </p>
                </div>

                <div class="flex flex-col">
                    <p class="text-lg lg:text-xl w-full"> 
                        Sizes
                    </p>
                    <Select 
                        v-model="size"
                        :options="item.sizes"
                        class="mt-2"
                    />
                </div>

                <div class="hidden md:flex items-center gap-1.5 mt-auto">
                    <IconsCheck class="!size-5 text-red-light" />
                    <span class="font-light"> Original and licensed product </span>
                </div>
            </div>
        </div>
        <div class="col-span-4 xl:col-span-1 p-6 flex flex-col gap-4 bg-gray-dark rounded-2xl text-white">
                <div class="text-xl lg:text-2xl flex items-center justify-center"> 
                    <span class="font-extralight">$</span>
                    <span> {{ item.price }} </span>
                    <span class="text-base xl:text-lg ml-1 xl:ml-1.5 text-gray-lightest font-light"> (includes taxes) </span>
                </div>
            <div class="flex flex-col sm:flex-row xl:flex-col h-full gap-4 justify-between">
                <div class="flex flex-col gap-4 sm:justify-between xl:justify-normal w-full">
                    <Button
                        @click="addToCart"
                        size="medium"
                        variant="secondary"
                    >
                        <IconsShoppingCart class="!size-4 sm:!size-5" />
                        <span> ADD TO CART </span>
                    </Button>
                    <Button
                        @click="$emit('toggleFavorite')" 
                        size="medium"
                        aria-label="favorite"
                    > 
                        <ClientOnly>
                            <IconsBookmark
                                variant="solid"
                                :class="[
                                    isFavorite ? 'stroke-gray-primary' : 'text-transparent stroke-white',
                                    '!size-4 sm:!size-5 transition duration-200'
                                ]"
                            />
                            <template #fallback>
                                <IconsBookmark
                                    variant="solid"
                                    class="text-transparent stroke-white !size-4 sm:!size-5 transition duration-200"
                                />
                            </template>
                        </ClientOnly>
                        <span> {{ isFavorite ? 'ADDED TO FAVORITES' : 'ADD TO FAVORITES' }} </span>
                    </Button>
                </div>
                <div class="bg-gray-primary py-3 lg:py-4 rounded-xl font-light flex flex-col items-center gap-3 w-full">
                    <div class="flex items-center gap-1.5">
                        <IconsEarth class="lg:!size-5 text-red-light" />
                        <span class="text-sm lg:text-base"> Free international shipping </span>
                    </div>
                    <div class="flex items-center gap-1.5">
                        <IconsUndo class="lg:!size-5 text-red-light" />
                        <span class="text-sm lg:text-base"> 30-day free refund policy </span>
                    </div>
                    <div class="flex items-center gap-1.5">
                        <IconsKeyhole class="lg:!size-5 text-red-light" />
                        <span class="text-sm lg:text-base"> Secure online payment </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
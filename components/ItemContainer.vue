<script setup>

import { useToast } from 'vue-toastification'

const props = defineProps({
    item: Object,
    isFavorite: Boolean
})

const toast = useToast()
const route = useRoute()

const cart = useCart()

const size = ref()
const date = new Date(new Date().getTime() + 48 * 60 * 60 * 1000).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
})

const addToCart = useDebounceFn(async () => {
    if (props.item?.sizes?.length && !size.value)
        toast.error('You must select a size first.')
    else {
        await cart.addItem(route.params.id, size.value)
    }
})

</script>

<template>
    <div class="grid grid-cols-4 gap-2 md:gap-3">
        <div class="flex col-span-4 xl:col-span-3 p-2 bg-gray-dark rounded-2xl">
            <NuxtImg 
                :src="item.photoUrl" 
                :alt="item.name" 
                class="size-[360px] lg:size-[420px] object-cover rounded-xl" 
                preload 
            />
            <div class="flex flex-col gap-3 lg:gap-6 text-white p-4 md:pl-6">
                <div class="flex flex-col gap-2">
                    <h1 class="text-xl lg:text-2xl text-white">
                        {{ item.name }}
                    </h1>

                    <div class="flex items-center gap-2">
                        <p class="text-lg lg:text-xl"> 
                            {{ parseFloat(item.rating).toFixed(2) }}
                        </p>
                        <Rating :rating="item.rating" class="mb-0.5" />
                        <p class="lg:text-lg text-gray-lightest"> 
                            ({{ item.reviews.length }} reviews) 
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

                <div class="flex items-center gap-1.5 mt-auto">
                    <IconsCheck class="!size-5 text-red-light" />
                    <span class="font-light"> Original and licensed product </span>
                </div>
            </div>
        </div>
        <div class="col-span-4 xl:col-span-1 p-6 flex flex-col justify-between gap-4 xl:gap-0 bg-gray-dark rounded-2xl text-white">
            <div class="flex xl:items-center w-full gap-6 xl:justify-between">
                <div class="text-xl lg:text-2xl"> 
                    <span class="font-extralight">$</span>
                    <span> {{ item.price }} </span>
                </div>
                <div class="flex items-center gap-1.5">
                    <IconsCheck class="!size-5 lg:!size-6 text-red-light" />
                    <span class="lg:text-lg"> In stock </span>
                </div>
            </div>
            <div class="bg-gray-primary py-3 lg:py-4 rounded-xl font-light flex flex-col items-center gap-3">
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
            <div class="flex flex-col xl:items-center">
                <div class="flex items-center gap-2">
                    <IconsDelivery class="!size-8 lg:!size-10" />
                    <span class="text-sm lg:text-base"> 
                        Standard delivery: 
                        <br/> 
                        <span> {{ date }} </span> 
                    </span>
                </div>
            </div>
            <div class="flex flex-col gap-6">
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
        </div>
    </div>
</template>
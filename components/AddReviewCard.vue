<script setup>

import { useEventBus } from '@vueuse/core'

const bus = useEventBus('modal')

const rating = ref(0)
const hoverRating = ref(0)

</script>

<template>
    <div>
        <div class="flex flex-col items-center gap-2 p-3 w-full rounded-2xl bg-gray-dark text-white">
            <div class="text-lg sm:text-xl"> 
                Bought or used this product?
            </div>
            <div class="text-sm font-light max-w-xl text-center"> 
                <p>
                    Contribute to our community by sharing your insights and experiences in a review.
                </p>
            </div>
            <div 
                class="hidden md:flex hover:cursor-pointer w-fit mx-auto" 
                @mouseleave="() => hoverRating = rating"
            >
                <template v-for="n in parseInt(hoverRating)">
                    <IconsStar 
                        class="text-yellow-primary !w-7 !h-7" 
                        @mouseover="() => hoverRating = n" 
                        @click="() => rating = hoverRating" 
                    />
                </template>
                <template v-for="n in 5 - parseInt(hoverRating)">
                    <IconsStar 
                        class="text-gray-light !w-7 !h-7" 
                        @mouseover="() => hoverRating = hoverRating + n" 
                        @click="() => rating = hoverRating" 
                    />
                </template>
            </div>
            <Button @click="() => bus.emit('addReview', { rating: rating })" variant="secondary" size="small" class="mt-1 max-w-32 sm:max-w-40"> 
                <IconsReview class="!w-4 !h-4 sm:!w-5 sm:!h-5"/>
                <span> ADD A REVIEW </span>
            </Button>
        </div>
    </div>
</template>

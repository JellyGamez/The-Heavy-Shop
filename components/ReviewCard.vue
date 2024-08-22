<script setup>

const props = defineProps({
    review: Object,
    isOwner: Boolean
})

const bus = useEventBus('modal')

</script>

<template>
    <div>
        <div class="relative flex justify-between w-full p-1 md:p-1.5 rounded-2xl bg-gray-dark">
            <div class="flex flex-col w-full gap-2.5 overflow-hidden">
                <div class="flex text-white justify-between gap-2 p-2 pb-0">
                    <div class="flex flex-col gap-3 truncate">
                        <div class="flex items-center gap-2 w-fit">
                            <NuxtImg 
                                :src="review.author.photoUrl ?? '/img/avatar.webp'" 
                                class="size-9 md:size-11 object-cover rounded-full text-xs" 
                                preload 
                            />
                            <p class="text-[15px] md:text-base truncate"> 
                                {{ review.author.name }} 
                            </p>
                        </div>
                        <div v-if="review.verified" class="flex items-center gap-x-1">
                            <IconsCheck class="text-red-light shrink-0" />
                            <p class="text-xs md:text-sm text-gray-lightest font-light shrink-0"> 
                                Verified purchase 
                            </p>
                        </div>
                    </div>

                    <div v-if="isOwner" class="flex h-fit shrink-0 gap-2">
                        <Button
                            @click="() => bus.emit('editReview', { id: review.id, rating: review.rating, review: review.content })" 
                            size="small" 
                            aria-label="edit"
                            class="!p-2 md:!p-2.5"
                        > 
                            <IconsPencil />
                        </Button>
                        <Button 
                            @click="() => bus.emit('confirmation', review.id)" 
                            size="small" 
                            aria-label="delete"
                            class="!p-2 md:!p-2.5"
                        > 
                            <IconsTrashBin class="!size-4" />
                        </Button>
                    </div>
                </div>
                <div class="flex flex-col w-full overflow-hidden text-white">
                    <div class="flex flex-wrap justify-between items-center gap-x-4 gap-y-2 px-2">
                        <Rating :rating="review.rating" />
                        <div class="flex items-center gap-x-1.5">
                            <IconsClock class="md:mb-0.5" />
                            <p class="text-xs md:text-sm font-light"> 
                                {{ review.updatedAt }} 
                            </p>
                        </div>
                    </div>
                    <p class="text-sm md:text-base rounded-xl bg-gray-primary px-3 py-2 md:px-3.5 md:py-2.5 font-light mt-3.5"> 
                        {{ review.content }} 
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

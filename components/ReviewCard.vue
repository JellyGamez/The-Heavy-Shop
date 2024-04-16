<script setup>

const props = defineProps({
    review: Object,
    isOwner: Boolean
})

</script>

<template>
    <div class="relative flex justify-between w-full p-3.5 md:p-4 rounded-2xl bg-gray-dark">
        <div class="flex flex-col w-full gap-3 overflow-hidden">
            <div class="flex text-white justify-between shrink-0 ">
                <div class="flex flex-col gap-2 ">
                    <div class="flex items-center gap-2 w-fit">
                        <NuxtImg 
                            src="/img/avatar.webp" 
                            alt="User avatar" 
                            class="w-11 h-11 object-cover rounded-full" 
                            preload 
                        />
                        <p class="line-clamp-2 w-full"> {{ review.author.name }} </p>
                    </div>
                    <div v-if="review.verified" class="flex items-center gap-x-1">
                        <IconsCheck class="text-red-light shrink-0"/>
                        <p class="text-xs md:text-sm text-gray-lightest font-light shrink-0"> Verified purchase </p>
                    </div>
                </div>

                <div v-if="isOwner">
                    <Button size="small" class="!p-2.5" @click="$emit('delete')"> 
                        <IconsTrashBin class="!w-4 !h-4" />
                    </Button>
                </div>
            </div>
            <div class="flex flex-col w-full overflow-hidden text-white">
                <div class="flex flex-wrap justify-between items-center gap-x-4 gap-y-2">
                    <Rating :rating="review.rating" />
                    <div class="flex items-center gap-x-1">
                        <IconsCalendar />
                        <p class="text-xs md:text-sm font-light"> {{ review.createdAt }} </p>
                    </div>
                </div>
                <p class="font-extralight mt-2 md:mr-10 lg:mr-32"> {{ review.content }} </p>
            </div>
        </div>
    </div>
</template>
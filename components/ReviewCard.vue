<script setup>

import toast from '@/composables/useToast'

const props = defineProps({
    review: Object,
    isOwner: Boolean
})

const verified = ref(true)

async function deleteReview() {
    const { error } = await useFetch(`/api/review/${props.review.id}`, {
        method: 'DELETE'
    })

    if (!error.value) {
        toast('Review deleted!')
    }
}

</script>

<template>
    <div class="relative flex justify-between w-full p-3 md:p-4 rounded-2xl bg-gray-dark">
        <div class="flex w-full gap-5">
            <div class="flex flex-col text-white justify-between w-32 shrink-0">
                <div class="flex flex-col items-center gap-2 ">
                    <NuxtImg 
                        src="/img/avatar.webp" 
                        alt="User avatar" 
                        class="w-10 h-10 object-cover rounded-full" 
                        preload 
                    />
                    <p class="text-center text-ellipsis overflow-hidden w-full"> {{ review.author.name }} </p>
                    <div v-if="verified" class="flex items-center gap-x-1">
                        <IconsCheck class="text-red-light shrink-0"/>
                        <p class="text-xs font-light shrink-0"> Verified purchase</p>
                    </div>
                </div>
            </div>
            <div class="flex flex-col w-full overflow-hidden text-white">
                <div class="flex flex-wrap justify-between items-center gap-x-4 gap-y-2">
                    <Rating :rating="review.rating" />
                    <div class="flex items-center gap-x-1">
                        <IconsCalendar />
                        <p class="text-sm font-light"> {{ review.createdAt }} </p>
                    </div>
                </div>
                <p class="font-light mt-2 mr-10 lg:mr-32"> {{ review.content }} </p>
                <div v-if="isOwner" class="absolute bottom-1 right-1 md:bottom-2 md:right-2">
                    <Button size="small" class="!p-2.5" @click="deleteReview"> 
                        <IconsTrashBin class="!w-4 !h-4" />
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

import { useToast } from 'vue-toastification'

const toast = useToast()

const route = useRoute()

const { data: user } = await useFetch('/api/user')
const { error, data: item } = await useAsyncData('item', () => $fetch(`/api${route.path}`))
if (error.value) {
    throw createError(error.value)
}

useHead({
    title: item?.value?.name,
    meta: [
        { name: 'description', content: item?.value?.name }
    ],
})

const loggedIn = useStatus()

function isOwner(review) {
    return review.authorId === user?.value?.id
}

async function deleteReview(id) {
    const { error } = await useFetch(`/api/review/${id}`, {
        method: 'DELETE'
    })

    if (!error.value) {
        // refreshNuxtData('item')
        toast.success('Review deleted!')
    }
    else 
        toast.error(error.value?.data.statusMessage, 'error')
}

</script>
<template>
    <div>
        <ConfirmationModal @confirm="deleteReview" />
        <div class="sm:ml-1 flex flex-col items-center sm:items-start text-white">
            <h1 class="text-2xl md:text-4xl text-white">
                {{ item.name }}
            </h1>
        </div>
        <div class="mt-2 md:mt-6">
            <div class="grid grid-cols-4">
                <div class="flex items-center col-span-3 p-2 bg-gray-dark rounded-2xl">
                    <NuxtImg 
                        :src="item.photoUrl" 
                        :alt="item.name" 
                        class="w-[450px] h-[450px] object-cover rounded-xl" 
                        preload 
                    />
                    <div class="flex flex-col w-full justify-between overflow-hidden text-white my-1 md:my-2 mr-2 ml-4 md:ml-6">
                        <div>
                            <div class="flex items-center gap-2 my-1 md:my-2">
                                <p class="text-lg"> {{ parseFloat(item.rating).toFixed(2) }}</p>
                                <Rating :rating="item.rating" class="mb-0.5" />
                                <p class="text-lg text-gray-lightest"> ({{ item.reviews.length }}) </p>
                            </div>
                            <p class="text-lg md:text-xl font-light text-gray-lightest w-full"> {{ item.description }} </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-center sm:justify-start items-center space-x-2 mt-6 md:mt-8 sm:ml-1 text-white">
            <IconsReview class="w-6 h-6 md:w-8 md:h-8 md:mt-0.5" />
            <h1 class="text-2xl md:text-4xl">
                Reviews
            </h1>
        </div>
        <div class="flex flex-col gap-2 md:gap-3 mt-2 md:mt-4">
            <AddReviewCard v-if="loggedIn" />
            <AuthPrompt v-else>
                <p class="mx-8">
                    To leave a review for this item, please log in or create an account. 
                </p>
                <p class="hidden md:block">
                    Your preferences will be stored for future visits. 
                </p>
            </AuthPrompt>
            <ReviewCard v-for="review in item.reviews" :review="review" :isOwner="isOwner(review)" />
        </div>
    </div>
</template>

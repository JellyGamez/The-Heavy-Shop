<script setup>

const route = useRoute()

const { error, data: item } = await useFetch(`/api${route.path}`)
if (error.value) {
    throw createError(error.value)
}

useHead({
    title: item?.value?.name,
    meta: [
        { name: 'description', content: item?.value?.name }
    ],
})

const { data: user } = await useFetch('/api/user')

function isOwner(review) {
    return review.authorId === user?.value?.id
}

</script>
<template>
    <div>
        <div class="sm:ml-1 flex flex-col items-center sm:items-start text-white">
            <h1 class="text-2xl md:text-4xl text-white">
                {{ item.name }}
            </h1>
        </div>
        <div class="mt-4 md:mt-6">
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
        <div class="flex flex-col gap-2 md:gap-3 mt-4 md:mt-6">
            <p class="text-white text-3xl"> Reviews </p>
            <ReviewCard v-for="review in item.reviews" :review="review" :isOwner="isOwner(review)"/>
        </div>
    </div>
</template>

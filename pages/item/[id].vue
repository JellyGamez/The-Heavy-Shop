<script setup>

import { useToast } from 'vue-toastification'

const route = useRoute()
const toast = useToast()
const sort = useSort()

const favorites = useFavorites()
const userFavorites = ref(await favorites.getIds())
const isFavorite = computed(() => userFavorites?.value?.some(item => item === route.params.id))

const toggleFavorite = useDebounceFn(async () => {
    const id = route.params.id
    if (isFavorite.value)
        await favorites.removeItem(id)
    else
        await favorites.addItem(id)
    userFavorites.value = await favorites.getIds()
})

const headers = useRequestHeaders(['cookie'])
const { data: user } = await useFetch('/api/user')
const { error, data: item } = await useAsyncData('item', () => $fetch(`/api${route.path}`, {
    query: sort.query(),
    headers
}))
if (error.value)
    throw createError(error.value)

useHead({
    title: item?.value?.name,
    meta: [
        { name: 'description', content: item?.value?.name }
    ],
})

definePageMeta({
    middleware: 'query-validation',
})

const loggedIn = useStatus()

const userLeftReview = computed(() => item?.value?.reviews?.some(review => review?.authorId === user?.value?.id))

function isOwner(review) {
    return review?.authorId === user?.value?.id
}

async function deleteReview(id) {
    const { error } = await useFetch(`/api/review/${id}`, {
        method: 'DELETE'
    })
    if (!error.value) {
        await refreshNuxtData('item')
        toast.success('Review deleted successfully!')
    }
    else 
        toast.error(error.value?.data.statusMessage)
}

</script>

<template>
    <div>
        <ReviewModal />
        <ConfirmationModal
            title="Are you sure you want to delete this review?"
            description="This action is irreversible."
            @confirm="deleteReview"
        />
        <div class="flex flex-col w-full gap-2 md:gap-3 mt-2">
            <ItemContainer 
                :item="item"
                :isFavorite="isFavorite"
                @toggleFavorite="toggleFavorite"
            />
            <Separator />
            <AddReviewCard v-if="loggedIn && !userLeftReview" />
            <AuthPrompt v-else-if="!loggedIn">
            <p class="mx-8 sm:mx-0">
                    To leave a review for this item, please log in or create an account. 
                </p>
                <p class="hidden md:block">
                    Your preferences will be stored for future visits. 
                </p>
            </AuthPrompt>
            <Separator v-if="!loggedIn || (loggedIn && !userLeftReview)" />
            <div class="sm:ml-1 flex flex-col items-center sm:flex-row gap-2 justify-between">
                <div class="flex flex-col items-center sm:items-start text-white">
                    <div class="flex items-center gap-1.5 lg:gap-2">
                        <IconsReview class="size-6 lg:size-7" />
                        <h1 class="text-2xl lg:text-3xl">
                            Reviews
                        </h1>
                    </div>
                    <p class="text-sm lg:text-base text-center"> 
                        Read genuine customer experiences 
                    </p>
                </div>
                <Sort 
                    v-if="item.reviews?.length"
                    @sort="async () => { await refreshNuxtData('item') }"
                    variant="reviews" 
                />
            </div>
            <div class="mt-2 lg:mt-4">
                <EmptyState 
                    v-if="!item.reviews?.length"
                    title="No reviews yet"
                    description="Add this item to your favorites list, and you'll be notified when new reviews are posted."
                >
                    <Button 
                        @click="toggleFavorite" 
                        variant="secondary" 
                        size="small" 
                        aria-label="favorite"
                        class="mt-1 max-w-48 sm:max-w-56 w-full"
                    > 
                        <ClientOnly>
                            <IconsBookmark
                                variant="solid"
                                :class="[
                                    isFavorite ? 'stroke-red-primary' : 'text-transparent stroke-white',
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
                        {{ isFavorite ? 'ADDED TO FAVORITES' : 'ADD TO FAVORITES' }}
                    </Button>
                </EmptyState>
                <div class="flex flex-col gap-2 md:gap-3">
                    <ReviewCard 
                        v-for="review in item.reviews" 
                        :key="review.id"
                        :review="review" 
                        :isOwner="isOwner(review)" 
                    />
                </div>
            </div>
        </div>
    </div>
</template>

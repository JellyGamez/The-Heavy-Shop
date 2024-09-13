<script setup>

import { useToast } from 'vue-toastification'

const route = useRoute()
const toast = useToast()

const favorites = useFavorites()
const userFavorites = ref(await favorites.getIds())

const id = computed(() => route.params.id)
const isFavorite = ref(userFavorites?.value?.some(item => item === id.value))

const toggleFavorite = useDebounceFn(async () => {
    if (isFavorite.value)
        await favorites.removeItem(id.value)
    else
        await favorites.addItem(id.value)
    isFavorite.value = !isFavorite.value
})

const headers = useRequestHeaders(['cookie'])
const { data: user } = await useFetch('/api/user')
const { error, data: item } = await useAsyncData('item', () => $fetch(`/api${route.path}`, {
    query: useQuery(),
    headers
}))
if (error.value)
    throw createError(error.value)

useHead({
    title: item?.value?.name
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
            <Banner
                icon="review"
                title="Reviews"
                description="Read genuine customer experiences"
                :reviewCount="item.reviews?.length"
            >
                <Sort 
                    v-if="item.reviews?.length"
                    @sort="async () => { await refreshNuxtData('item') }"
                    variant="reviews" 
                />
            </Banner>

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

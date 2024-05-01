<script setup>

import { useEventBus } from '@vueuse/core'
import { useToast } from 'vue-toastification'

const toast = useToast()

const props = defineProps({
	itemId: String,
	rating: Number
})

const isOpen = ref(false)
const rating = ref(props.rating)
const hoverRating = ref(props.rating)
const review = ref()

const errorMessage = ref()

const bus = useEventBus('modal')
bus.on(function (event) {
    if (event === 'review')
		isOpen.value = true
})

async function addReview() {
	errorMessage.value = null
    const { error } = await useFetch('/api/review', {
        method: 'POST',
        body: {
            rating: rating.value,
			review: review.value,
			itemId: props.itemId
        }
    })
	errorMessage.value = error.value?.data.statusMessage
	if (!error.value) {
		refreshNuxtData('item')
		toast.success('Review added succesfully!')
		isOpen.value = false
	}
}

watch(() => props.rating, (newValue) => {
	rating.value = hoverRating.value = newValue;
})

</script>

<template>
	<Modal v-model="isOpen">
		<template #title>
			Add a review
		</template>
		<template #content>
			<form @submit.prevent="addReview">
				<div class="flex flex-col gap-4">
					<div class="flex hover:cursor-pointer w-fit mx-auto" @mouseleave="() => hoverRating = rating">
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
					<div class="flex flex-col">
						<Label for="review"> Review </Label>
						<textarea v-model="review" name="review" id="review" type="text" class="h-24 px-3.5 py-2.5 w-full text-sm text-white outline-none hover:outline-none border-0 focus:ring-2 focus:ring-inset focus:ring-red-primary transition duration-200 bg-gray-primary focus:bg-gray-dark rounded-xl resize-none" />
					</div>
					<Error class="text-center !mt-0">
						{{ errorMessage }}
					</Error>
					<Button type="submit">
						ADD REVIEW
					</Button>
				</div>
			</form>
		</template>
	</Modal>
</template>

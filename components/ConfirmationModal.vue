<script setup>

import { useEventBus } from '@vueuse/core'

const emit = defineEmits(['cancel', 'continue'])

const isOpen = ref(false)

const bus = useEventBus('modal')

bus.on(function (event, attribute) {
    if (event === 'cancel')
		isOpen.value = true
})

</script>

<template>
	<HeadlessTransitionRoot appear :show="isOpen" as="template">
		<HeadlessDialog as="div" @close="isOpen = false" class="relative z-10">
			<HeadlessTransitionChild as="template" enter="duration-200 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
				<div class="fixed inset-0 bg-black/20" />
			</HeadlessTransitionChild>
			<div class="fixed inset-0 overflow-y-auto">
				<div class="flex min-h-full items-center justify-center p-2 sm:p-4 text-center">
					<HeadlessTransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
						<HeadlessDialogPanel class="flex flex-col text-white max-w-md w-full transform overflow-hidden rounded-2xl bg-gray-dark p-3 pt-7 sm:p-4 sm:pt-8 text-left align-middle">
							<button class="absolute top-4 right-4" @click="isOpen = false">
                                <IconsClose class="text-white" />
                            </button>
                            
                            <HeadlessDialogTitle as="h3" class="text-xl sm:text-2xl text-center mb-4">
								Are you sure you want to delete this item?
							</HeadlessDialogTitle>

							<form @submit.prevent="addReview">
								<div class="flex flex-col gap-4">
									<div class="flex hover:cursor-pointer w-fit mx-auto" @mouseleave="() => hoverRating = rating">
										<template v-for="n in parseInt(hoverRating)">
											<IconsStar class="text-yellow-primary !w-7 !h-7" 
												@mouseover="() => hoverRating = n" 
												@click="() => rating = hoverRating" 
											/>
										</template>
										<template v-for="n in 5 - parseInt(hoverRating)">
											<IconsStar class="text-gray-light !w-7 !h-7" 
												@mouseover="() => hoverRating = hoverRating + n" 
												@click="() => rating = hoverRating" 
											/>
										</template>
									</div>
									<div>
										<Label for="review"> Review </Label>
										<textarea v-model="review" name="review" id="review" type="text" class="h-24 px-3.5 py-2.5 w-full text-sm text-white outline-none hover:outline-none border-0 focus:ring-2 focus:ring-inset focus:ring-red-primary transition duration-200 bg-gray-primary focus:bg-gray-dark rounded-xl resize-none" />
									</div>
									<Error class="text-center -mt-2 -mb-0.5">
										{{ errorMessage }}
									</Error>
									<Button type="submit">
										ADD REVIEW
									</Button>
								</div>
							</form>
						</HeadlessDialogPanel>
					</HeadlessTransitionChild>
				</div>
			</div>
		</HeadlessDialog>
	</HeadlessTransitionRoot>
</template>

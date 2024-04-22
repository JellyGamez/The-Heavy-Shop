<script setup>

</script>

<template>
	<HeadlessTransitionRoot appear :show="isOpen" as="template">
		<HeadlessDialog as="div" @close="closeModal" class="relative z-10">
			<HeadlessTransitionChild as="template" enter="duration-200 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
				<div class="fixed inset-0 bg-black/20" />
			</HeadlessTransitionChild>
			<div class="fixed inset-0 overflow-y-auto">
				<div class="flex min-h-full items-center justify-center p-2 sm:p-4 text-center">
					<HeadlessTransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
						<HeadlessDialogPanel class="flex flex-col text-white max-w-md w-full transform overflow-hidden rounded-2xl bg-gray-dark p-3 pt-7 sm:p-4 sm:pt-8 text-left align-middle">
							<button class="absolute top-4 right-4" @click="closeModal">
                                <IconsClose class="text-white" />
                            </button>
                            
                            <HeadlessDialogTitle as="h3" class="text-xl sm:text-2xl text-center mb-4">
								Add a review
							</HeadlessDialogTitle>

							<form @submit.prevent="addReview">
								<Label> Rating </Label>
								<RatingInput v-model="rating" />

								<Label> Review </Label>
								<textarea class="h-24 px-3.5 py-2.5 w-full text-sm text-white outline-none hover:outline-none border-0 focus:ring-2 focus:ring-inset focus:ring-red-primary transition duration-200 bg-gray-primary focus:bg-gray-dark rounded-xl resize-none" />
								
								<div class="mt-4">
									<Button size="small" class="mt-1 w-full" type="submit">
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

<script setup>

const isOpen = ref(true)

function closeModal() {
	isOpen.value = false
}
function openModal() {
	isOpen.value = true
}
</script>
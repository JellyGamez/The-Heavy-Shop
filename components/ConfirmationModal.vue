<script setup>

import { useEventBus } from '@vueuse/core'

const isOpen = ref(false)
const id = ref()

const bus = useEventBus('modal')
bus.on(function (event, attribute) {
    if (event === 'confirmation') {
		isOpen.value = true
		id.value = attribute
	}
})

</script>

<template>
	<Modal v-model="isOpen">
		<template #title>
			Are you sure you want to delete this review?
		</template>
		<template #content>
			<p class="text-center text-sm font-light"> 
				This action is irreversible.
			</p>

			<div class="mt-8 flex gap-4">
				<Button variant="secondary" @click="() => isOpen = false">
					CANCEL
				</Button>
				<Button variant="primary" @click="() => { isOpen = false; $emit('confirm', id) }">
					CONFIRM
				</Button>
			</div>
		</template>
	</Modal>
	
</template>

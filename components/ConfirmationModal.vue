<script setup>

const props = defineProps({
	title: String,
	description: String
})

const bus = useEventBus('modal')
bus.on(function (event, attribute) {
    if (event === 'confirmation') {
		isOpen.value = true
		id.value = attribute
	}
})

const isOpen = ref(false)
const id = ref()

</script>

<template>
	<Modal v-model="isOpen">
		<template #title>
			{{ title }}
		</template>
		<template #content>
			<p class="text-center text-sm font-light"> 
				{{ description }}
			</p>
			<div class="mt-5 sm:mt-7 flex gap-4">
				<Button 
					variant="primary" 
					size="small"
					@click="() => isOpen = false"
				>
					CANCEL
				</Button>
				<Button 
					variant="secondary"
					size="small"
					@click="() => { 
						isOpen = false
						$emit('confirm', id) 
					}"
				>
					CONFIRM
				</Button>
			</div>
		</template>
	</Modal>
	
</template>

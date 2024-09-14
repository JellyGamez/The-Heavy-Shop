<script setup>

const route = useRoute()

const search = ref(route.query?.search ?? null)
const isOpen = ref(false)

const modalBus = useEventBus('modal')
const searchBus = useEventBus('search')
modalBus.on(function(event) {
    if (event === 'search')
		isOpen.value = true
})

async function handleSubmit() {
	isOpen.value = false

	await navigateTo({
		name: 'shop',
		query: {
			search: search.value?.trim()
		}
	})

	searchBus.emit()
}

watch(() => route.query?.search, async (newValue) => {
    search.value = newValue
})

</script>

<template>
	<Modal v-model="isOpen">
		<template #content>
			<p class="text-gray-lightest sm:text-lg font-light -mt-[40px] sm:-mt-[46px] mb-3"> Press enter to search </p>
			<SearchInput 
				v-model="search" 
				@submit="handleSubmit"
			/>
		</template>
	</Modal>
</template>

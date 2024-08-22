<script setup>

const route = useRoute()

const search = ref(route.query?.search ?? null)
const isOpen = ref(false)

const bus = useEventBus('modal')
bus.on(function (event) {
    if (event === 'search')
		isOpen.value = true
})

async function handleSubmit() {
	isOpen.value = false

	await navigateTo({
		name: 'shop',
		query: {
			search: search.value
		}
	})

	await refreshNuxtData('items')
}

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

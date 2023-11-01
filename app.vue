<script setup>

useHead({
	titleTemplate: (titleChunk) => {
		return titleChunk ? `${titleChunk} - The Heavy Shop` : 'The Heavy Shop'
	}
})

</script>

<template>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
</template>

<!-- <style>
.page-enter-active,
.page-leave-active {
	transition: all 0.2s
}

.page-enter-from,
.page-leave-to {
	opacity: 0
}
</style> -->
<script setup>

useHead({
	titleTemplate: (titleChunk) => {
		return titleChunk ? `${titleChunk} - The Heavy Shop` : 'The Heavy Shop'
	}
})

const nuxtApp = useNuxtApp()
nuxtApp.hook("page:finish", async () => {
    window.scrollTo({ top: 0 })
})

</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<style>

@keyframes slideIn {
	from {
		transform: translateY(100%);
	}
	to {
		transform: translateY(0%);
	}
}
@keyframes slideOut {
	from {
		transform: translateY(0%);
		opacity: 100;
	}
	to {
		transform: translateY(150%);
		opacity: 0;
	}
}

.toast-enter-active {
  	animation-name: slideIn;
 	animation-duration: 200ms;
}
.toast-leave-active {
  	animation-name: slideOut;
  	animation-duration: 300ms;
}

</style>

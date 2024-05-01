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
		transform: translateX(0%);
		opacity: 1;
	}
	to {
		transform: translateX(100%);
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

/* .page-enter-active,
.page-leave-active {
	transition: all 0.2s
}
.page-enter-from,
.page-leave-to {
	opacity: 0
} */

</style>

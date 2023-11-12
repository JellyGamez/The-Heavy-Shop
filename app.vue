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
		transform: translateY(100%) scale(0);
		opacity: 0;
	}
	to {
		transform: translateY(0%) scale(1);
		opacity: 1;
	}
}
@keyframes slideOut {
	from {
		transform: translateY(0%) scale(1);
		opacity: 1;
	}
	to {
		transform: translateY(100%) scale(0);
		opacity: 0;
	}
}
.toast-enter-active {
  	animation-name: slideIn;
 	animation-duration: 300ms;
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

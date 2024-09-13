<script setup>

useHead({
	titleTemplate: (titleChunk) => {
		return titleChunk ? `${titleChunk} - The Heavy Shop` : 'The Heavy Shop'
	},
	meta: [{ 
        name: 'description', content: '\
        Your premier destination for licensed heavy metal merchandise. \
        We offer a curated selection of apparel, accessories, and collectibles, all designed to celebrate the style you love. \
        Explore our extensive collection and discover the perfect items to express your passion for the genre!'
    }],
})

useSync()

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

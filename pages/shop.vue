<script setup>

useHead({
    title: 'Shop',
    meta: [
        { name: 'description', content: 'Shop' }
    ],
})

</script>

<template>
    <div>
        <div class="flex flex-col items-center sm:items-start text-white">
            <div class="flex items-center space-x-2">
                <IconsShoppingBag class="w-6 h-6 md:w-8 md:h-8"/>
                <h1 class="text-2xl md:text-4xl text-white">
                    Shop
                </h1>
            </div>
            <p class="text-sm md:text-base text-center">
                Explore and curate your heavy metal haven
            </p>
        </div>
        <div class="grid grid-cols-6 gap-4 mt-6">
            <PreviewItemCard v-for="n in 10" :item="{name: 'Red T-shirt'}"/>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    item: Object
})

const favorites = useFavorites()

</script>

<template>
    <div class="flex flex-col text-center text-white gap-2 max-w-sm w-full bg-gray-dark rounded-xl p-2">
        <span> {{ item.name }} </span>
        <span> ${{ item.price }} </span>
        <NuxtImg :src="item.photoUrl" :alt="item.name" class="rounded-xl h-full" preload />
        <Button variant="secondary" size="small"> 
            Add to cart 
        </Button>
        <Button variant="primary" size="small" @click="favorites.addItem(item.id)"> 
            Add to favorites 
        </Button>
    </div>
</template>

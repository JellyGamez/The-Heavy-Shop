<script setup>

const props = defineProps({
    item: Object
})

</script>

<template>
    <div class="flex flex-col text-center text-white gap-4 max-w-sm w-full bg-gray-dark rounded-xl p-2">
        <span> {{ item.name }}   </span>
        <span> {{ item.price }}$ </span>
        <img :src="item.photoUrl" :alt="item.name" class="rounded-xl">
        <Button size="small"> Add to cart </Button>
        <Button size="small"> Add to favorites </Button>
    </div>
</template>

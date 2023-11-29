<script setup>

const props = defineProps({
    item: Object
})

</script>

<template>
    <div class="flex flex-col gap-4 max-w-sm w-full bg-neutral-600 rounded-xl p-2">
        {{ item.name }}
        <img src="img/test.webp" :alt="item.name">
        <Button size="small"> Add to cart</Button>
    </div>
</template>

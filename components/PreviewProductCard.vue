<script setup>

const props = defineProps({
    label: String
})

</script>

<template>
    <div class="flex flex-col gap-4 max-w-sm w-full bg-neutral-600 rounded-xl p-2">
        {{ label }}
        <img src="img/test.webp" :alt="label">
        <Button size="small"> Add to cart</Button>
    </div>
</template>

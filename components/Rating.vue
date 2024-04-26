<script setup>

const props = defineProps({
    rating: Number
})

</script>

<template>
    <div class="flex">
        <IconsStar v-for="n in parseInt(rating)" class="text-yellow-primary" />
        <IconsStar v-for="n in 5 - parseInt(rating)" class="text-gray-light" />
    </div>
</template>

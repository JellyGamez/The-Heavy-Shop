<script setup>

const props = defineProps({
    score: Number
})

</script>

<template>
    <div class="flex">
        <IconsStar v-for="n in parseInt(score)" class="text-yellow-500" />
        <IconsStar v-for="n in 5 - parseInt(score)" class="text-gray-light" />
    </div>
</template>
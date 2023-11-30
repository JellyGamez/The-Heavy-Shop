<script setup>

const props = defineProps({
    item: Object
})

</script>

<template>
    <div class="bg-gray-500 p-5 rounded-lg">
        {{ item.name }}
    </div>
</template>

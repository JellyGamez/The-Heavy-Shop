<script setup>

const props = defineProps({
    title: String,
    description: String
})

</script>

<template>
    <div class="flex flex-col items-center gap-2 p-3 w-full rounded-2xl bg-gray-dark text-white">
        <div
            v-html="title"
            class="text-lg sm:text-xl"
        />
        <div
            v-html="description" 
            class="text-sm font-light max-w-xl text-center" 
        />
        <slot />
    </div>
</template>

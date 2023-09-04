<script setup>

const props = defineProps({
    label: String
})
</script>

<template>
    <div class="w-full flex justify-center">
        <div class="w-full mx-2 max-w-sm bg-gray-dark p-4 md:p-8 rounded-xl">
            <p class="text-center text-red-primary text-3xl font-semibold font-kanit"> {{ label }} </p>
            <slot />
        </div>
    </div>
</template>
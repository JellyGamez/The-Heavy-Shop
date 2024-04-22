<script setup>

const props = defineProps({
    title: String,
    description: String
})

</script>

<template>
    <div class="w-full max-w-sm bg-gray-dark p-4 pt-7 sm:p-5 sm:pt-8 rounded-2xl">
        <div class="mb-6">
            <h1 class="text-center text-red-primary text-2xl sm:text-[26px] font-medium mb-3">
                {{ title }}
            </h1>
            <p class="text-center text-white font-extralight text-sm">
                {{ description }}
            </p>
        </div>
        <slot />
    </div>
</template>

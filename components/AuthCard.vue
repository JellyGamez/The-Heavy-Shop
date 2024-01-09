<script setup>

const props = defineProps({
    title: String,
    description: String
})

</script>

<template>
    <div class="w-full flex justify-center">
        <div class="w-full m-4 max-w-sm bg-gray-dark p-5 pt-8 rounded-xl">
            <div class="mb-6">
                <h1 class="text-center text-red-primary text-[26px] font-medium mb-3"> {{ title }} </h1>
                <p class="text-center text-white font-extralight text-sm"> {{ description }} </p>
            </div>
            <slot />
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    label: String
})

</script>

<template>
    <div class="w-full flex justify-center">
        <div class="w-full m-4 max-w-sm bg-gray-dark p-5 pt-8 rounded-xl">
            <p class="text-center text-red-primary text-3xl font-semibold font-kanit mb-8"> {{ label }} </p>
            <slot />
        </div>
    </div>
</template>
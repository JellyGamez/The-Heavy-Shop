<script setup>

const props = defineProps({
    modelValue: String
})

</script>

<template>
    <div class="relative flex items-center">
        <input
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            class="px-4 py-3 pr-12 w-full text-sm text-white outline-none hover:outline-none border-0 focus:ring-2 focus:ring-inset focus:ring-red-primary transition duration-200 bg-gray-primary focus:bg-gray-dark rounded-xl"
        />
        <div class="absolute right-3">
            <slot />
        </div>
    </div>
</template>
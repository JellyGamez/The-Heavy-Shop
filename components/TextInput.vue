<script setup>

const props = defineProps({
    modelValue: String,
})

defineOptions({
    inheritAttrs: false
})

</script>

<template>
    <div class="relative flex items-center">
        <input
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            v-bind="$attrs"
            class="px-4 py-2.5 pr-12 w-full text-sm text-white outline-none hover:outline-none border-0 focus:ring-2 focus:ring-inset focus:ring-red-primary transition duration-200 bg-gray-primary focus:bg-gray-dark rounded-xl"
        >
        <div class="absolute right-3">
            <slot />
        </div>
    </div>
</template>

<style scoped>

input:-webkit-autofill,
input:-webkit-autofill:hover{
    transition: background-color 50000s ease-in-out 0.2s;
    -webkit-text-fill-color: white;
    caret-color: white; /* Change the caret (cursor) color */
}
input:-webkit-autofill:focus, 
input:-webkit-autofill:active{
    transition: background-color 50000s ease-in-out 0s;
    -webkit-text-fill-color: white;
    caret-color: white; /* Change the caret (cursor) color */
}

</style>
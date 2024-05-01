<script setup>

const input = defineModel()

defineOptions({
    inheritAttrs: false
})

</script>

<template>
    <div class="relative flex items-center">
        <input
            v-bind="$attrs"
            v-model="input"
            class="px-3.5 py-2.5 pr-11 w-full text-sm text-white outline-none hover:outline-none border-0 focus:ring-2 focus:ring-inset focus:ring-red-primary transition duration-200 bg-gray-primary focus:bg-gray-dark rounded-xl"
        >
        <div class="absolute right-3">
            <slot />
        </div>
    </div>
</template>

<style scoped>

input:-webkit-autofill,
input:-webkit-autofill:hover {
    -webkit-box-shadow: 0 0 0px 20px #262626 inset;
    -webkit-text-fill-color: white;
    transition: background-color 50000s;
    caret-color: white;
}
input:-webkit-autofill:focus, 
input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0px 2px #C70404 inset;
    -webkit-text-fill-color: white;
    transition: background-color 50000s;
    caret-color: white;
}

</style>

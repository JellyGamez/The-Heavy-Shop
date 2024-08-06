<script setup>

const props = defineProps({
    options: Array
})

const selected = defineModel()

</script>

<template>
    <div class="flex gap-1.5 md:gap-2 items-center text-white">
        <div class="flex flex-wrap rounded-2xl bg-gray-primary p-1 gap-1 focus:outline-none">
            <button
                v-for="option in options"
                :key="option"
                @click="selected = option"
                :aria-label="option"
                :class="[
                    option === selected ? 'text-red-light bg-gray-dark' : ' hover:bg-gray-dark',
                    'text-sm md:text-base !w-fit  px-3 py-1 rounded-xl outline-none transition duration-200'
                ]"
            >
                {{ option }}
            </button>
        </div>
    </div>
</template>

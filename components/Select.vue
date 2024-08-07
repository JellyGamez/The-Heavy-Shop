<script setup>

const props = defineProps({
    options: Array
})

const selected = defineModel()

</script>

<template>
    <div class="flex gap-1.5 lg:gap-2 items-center text-white">
        <div class="flex flex-wrap rounded-xl bg-gray-primary p-0.5 lg:p-1 gap-0.5 lg:gap-1 focus:outline-none">
            <button
                v-for="option in options"
                :key="option"
                @click="selected = option"
                :aria-label="option"
                :class="[
                    option === selected ? 'text-red-light bg-gray-dark' : ' hover:bg-gray-dark',
                    'text-sm lg:text-base !w-10 lg:!w-12 px-2 py-1 rounded-[9px] outline-none transition duration-200'
                ]"
            >
                {{ option }}
            </button>
        </div>
    </div>
</template>

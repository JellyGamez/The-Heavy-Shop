<script setup>

defineOptions({
    inheritAttrs: false
})

const emit = defineEmits(['submit'])

const input = defineModel()

const target = ref()
const form = ref()

useFocus(target, {
    initialValue: true
})

function clear() {
    input.value = null
    form.value.dispatchEvent(new Event('submit'))
}

</script>

<template>
    <form 
        ref="form"
        @submit.prevent="() => emit('submit')"
    >
        <div class="relative flex items-center">
            <input
                v-bind="$attrs"
                v-model="input"
                ref="target"
                placeholder="Search items..."
                class="py-2 px-10 w-full text-white outline-none hover:outline-none border-0 focus:ring-[1.5px] focus:ring-inset focus:ring-red-primary transition duration-200 bg-gray-primary focus:bg-gray-dark rounded-xl placeholder-white"
            >
            <button 
                type="submit"
                class="absolute left-2.5"
            >
                <IconsSearch class="text-white hover:text-gray-lightest transition duration-200" />
            </button>
            <button 
                v-if="input"
                type="submit"
                class="absolute right-2.5"
                @click="clear"
            >
                <IconsClose class="text-white hover:text-gray-lightest transition duration-200" />
            </button>
        </div>
    </form>

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
    -webkit-box-shadow: 0 0 0px 2px #D4171E inset;
    -webkit-text-fill-color: white;
    transition: background-color 50000s;
    caret-color: white;
}

</style>

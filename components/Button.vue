<script setup>

const props = defineProps({
    style: {
        type: String,
        default: 'primary',
        validator(value) {
            return ['primary', 'secondary', 'neutral'].includes(value);
        } 
    },
    size: {
        type: String,
        default: 'medium',
        validator(value) {
            return ['small', 'medium', 'large'].includes(value);
        } 
    }
})

const styleClasses = computed(() => {
    return {
        'primary': 'bg-gray-primary hover:bg-gray-dark text-white',
        'secondary': 'bg-red-primary hover:bg-red-dark',
        'neutral': '',
    }[props.style];
})

const sizeClasses = computed(() => {
    return {
        'small': 'px-3 py-2',
        'medium': 'px-5 py-3',
        'large': 'px-10 py-4',
    }[props.size];
})


</script>

<template>
    <button :class="[styleClasses, sizeClasses, 'transition-colors duration-200 rounded-xl']">
        <slot/>
    </button>
</template>
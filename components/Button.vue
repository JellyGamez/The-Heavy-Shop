<script setup>

const props = defineProps({
    variant: {
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

const variantClasses = computed(() => {
    return {
        'primary': 'bg-gray-primary hover:bg-gray-dark text-white',
        'secondary': 'bg-red-primary hover:bg-red-dark',
        'neutral': '',
    }[props.variant];
})

const sizeClasses = computed(() => {
    return {
        'small': 'px-3 py-2 text-sm',
        'medium': 'px-5 py-3',
        'large': 'px-8 py-3 text-lg',
    }[props.size];
})


</script>

<template>
    <button :class="[variantClasses, sizeClasses, 'transition-colors duration-200 rounded-full font-normal']">
        <slot />
    </button>
</template>
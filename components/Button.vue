<script setup>

const props = defineProps({
    variant: {
        type: String,
        default: 'primary',
        validator(value) {
            return ['primary', 'secondary'].includes(value)
        }
    },
    size: {
        type: String,
        default: 'small',
        validator(value) {
            return ['tiny', 'small', 'medium', 'large'].includes(value)
        }
    }
})

const variantClasses = computed(() => {
    return {
        'primary'   : 'bg-gray-primary hover:bg-gray-dark text-white ring-2 ring-inset ring-gray-primary hover:ring-red-primary',
        'secondary' : 'bg-red-primary hover:bg-red-dark text-white',
    }[props.variant]
})

const sizeClasses = computed(() => {
    return {
        'tiny'   : 'px-2 py-2 text-xs',
        'small'  : 'px-3 py-2.5 text-sm',
        'medium' : 'px-5 py-3 text-base',
        'large'  : 'px-8 py-3 text-lg',
    }[props.size]
})

</script>

<template>
    <button :class="[variantClasses, sizeClasses, 'transition duration-200 rounded-xl font-normal font-kanit']">
        <slot />
    </button>
</template>

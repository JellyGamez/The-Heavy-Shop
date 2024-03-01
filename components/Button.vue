<script setup>

const props = defineProps({
    variant: {
        type: String,
        default: 'primary',
    },
    size: {
        type: String,
        default: 'normal',
    }
})

const variantClasses = computed(() => {
    return {
        'primary'   : 'text-white bg-gray-primary hover:bg-gray-dark ring-2 ring-inset ring-gray-primary hover:ring-red-primary',
        'secondary' : 'text-white bg-red-primary hover:bg-red-dark',
        'neutral'   : 'text-white',
        'disabled'  : 'text-gray-light'
    }[props.variant]
})

const sizeClasses = computed(() => {
    return {
        'normal' : 'px-3 py-2.5 text-sm',

        'small'  : 'px-2.5 py-2.5 text-xs sm:px-3 sm:py-2.5 sm:text-sm',
        'medium' : 'px-3 py-2.5 text-sm sm:px-5 sm:py-3 sm:text-base',
        'large'  : 'px-5 py-3 text-base sm:px-8 sm:py-3 sm:text-lg',
    }[props.size]
})

</script>

<template>
    <button :class="[variantClasses, sizeClasses, 'transition duration-200 rounded-xl font-normal']">
        <slot />
    </button>
</template>

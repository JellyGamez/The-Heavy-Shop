<script setup>

const props = defineProps({
    variant: {
        type: String,
        default: 'primary',
    },
    size: {
        type: String,
        default: 'small',
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

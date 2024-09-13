<script setup>

const props = defineProps({
    variant: {
        type: String,
        default: 'primary'
    },
    size: {
        type: String,
        default: 'normal'
    }
})

const variantClasses = computed(() => {
    return {
        'neutral'   : '',
        'primary'   : 'bg-gray-primary hover:bg-gray-dark ring-[1.5px] ring-inset ring-gray-primary hover:ring-red-primary',
        'secondary' : 'bg-red-primary hover:bg-red-dark',
        'loading'   : 'bg-gray-dark !text-gray-lighter cursor-not-allowed ring-[1.5px] ring-inset ring-gray-primary'
    }[props.variant]
})

const sizeClasses = computed(() => {
    return {
        'normal' : 'px-3 py-2.5 text-sm',
        'small'  : 'px-2.5 py-2.5 text-xs sm:px-3 sm:py-2.5 sm:text-sm',
        'medium' : 'px-3 py-2.5 text-sm md:px-4 md:py-3 md:text-[15px]',
        'large'  : 'px-5 py-3 text-base sm:px-8 sm:py-3 sm:text-lg !rounded-2xl'
    }[props.size]
})

</script>

<template>
    <button 
        :class="[
            variantClasses, 
            sizeClasses, 
            'transition duration-200 rounded-xl text-white font-normal w-full outline-none'
        ]" 
        :disabled="variant === 'loading'"
    >
        <div class="flex w-full items-center justify-center gap-1">
            <IconsSpinner 
                v-if="variant === 'loading'" 
                class="animate-spin mr-1" 
            />
            <slot />
        </div>
    </button>
</template>

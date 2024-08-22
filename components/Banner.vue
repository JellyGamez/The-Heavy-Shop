<script setup>

import { IconsBookmark, IconsDocument, IconsShoppingBag, IconsShoppingCart, IconsUser } from '#components'

const props = defineProps({
    icon: String,
    title: String,
    description: String
})

const icon = computed(() => {
    return {
        'user'          : IconsUser,
        'document'      : IconsDocument,
        'bookmark'      : IconsBookmark,
        'shopping-bag'  : IconsShoppingBag,
        'shopping-cart' : IconsShoppingCart
    }[props.icon]
})

</script>

<template>
    <div class="sm:ml-1 flex flex-wrap flex-col items-center sm:flex-row gap-x-10 gap-y-2.5 justify-between">
        <div class="flex flex-col items-center sm:items-start text-white">
            <div class="flex items-center gap-1.5 lg:gap-2">
                <component :is="icon" class="size-6 lg:size-7" />
                <h1 class="text-2xl lg:text-3xl">
                    {{ title }}
                </h1>
            </div>
            <p class="text-sm lg:text-base text-center -mt-0.5 lg:-mt-1">
                {{ description }}
            </p>
        </div>
        <slot />
    </div>
</template>

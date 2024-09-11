<script setup>

import { IconsUser, IconsReview, IconsGraphUp, IconsDocument, IconsBookmark, IconsShoppingBag, IconsShoppingCart  } from '#components'

const props = defineProps({
    icon: String,
    title: String,
    description: String,
    reviewCount: Number
})

const icon = computed(() => {
    return {
        'user'          : IconsUser,
        'review'        : IconsReview,
        'graph-up'      : IconsGraphUp,
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
                <h1 
                    v-html="title"
                    class="text-2xl lg:text-3xl" 
                />
                <span
                    v-if="reviewCount"
                    class="text-2xl lg:text-3xl font-light"
                >
                    ({{ reviewCount }})
                </span>
            </div>
            <p 
                v-html="description"
                class="text-sm lg:text-base text-center -mt-0.5 lg:-mt-1 font-light"
            />
        </div>
        <slot />
    </div>
</template>

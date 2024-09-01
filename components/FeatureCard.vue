<script setup>

import { IconsUndo, IconsEarth, IconsKeyhole } from '#components'

const props = defineProps({
    feature: Object
})

const icon = computed(() => {
    return {
        'undo'    : IconsUndo,
        'earth'   : IconsEarth,
        'keyhole' : IconsKeyhole
    }[props.feature.icon]
})

</script>

<template>
    <div class="flex flex-col items-center gap-2 bg-gray-dark p-3 lg:p-4 rounded-2xl">
        <div class="flex items-center gap-1.5">
            <component :is="icon" class="size-5 lg:!size-6 text-red-light" />
            <span class="lg:text-lg font-normal"> 
                {{ feature.title }}
            </span>
        </div>
        <p class="text-sm lg:text-base font-light text-center mx-6"> 
            {{ feature.description }}
        </p>
    </div>
</template>

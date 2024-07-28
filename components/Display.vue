<script setup>

import { IconsGrid, IconsList } from '#components'

const route = useRoute()

const display = computed(() => route.query?.display ?? 'grid')

// TODO: Middleware integration
if (display.value !== 'grid' && display.value !== 'list')
    throw createError({
        statusCode: 500,
        statusMessage: 'Something went wrong.'
    })

const options = ['grid', 'list']

const icons = {
    'grid': IconsGrid,
    'list': IconsList
}

async function handleDisplay(option) {
    await navigateTo({
        path: route.path,
        query: {
            display: option
        }
    })
}

</script>

<template>
    <div class="flex items-center gap-1 justify-center rounded-2xl bg-gray-dark py-1.5 px-2">
        <button 
            v-for="option in options"
            @click="handleDisplay(option)" 
            class="group p-1 rounded-xl outline-none"
        >
            <component
                :is="icons[option]"
                :class="[
                    display === option ? 'text-red-light' : 'text-white group-hover:text-red-light', 
                    'md:size-6 transition duration-200'
                ]"
            />
        </button>
    </div>
</template>

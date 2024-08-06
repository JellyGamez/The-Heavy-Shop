<script setup>

import { IconsGrid, IconsList } from '#components'

const route = useRoute()

const display = computed(() => route.query?.display ?? 'grid')

const options = ['grid', 'list']
const icons = {
    'grid' : IconsGrid,
    'list' : IconsList
}

async function handleDisplay(option) {
    await navigateTo({
        path: route.path,
        query: {
            ...route.query,
            display: option
        }
    })
}

</script>

<template>
    <div class="flex gap-1.5 md:gap-2 items-center text-white">
        <p class="hidden sm:block text-sm"> 
            Display 
        </p>
        <div class="flex items-center gap-1 justify-center rounded-2xl bg-gray-dark py-1 md:py-1.5 px-1.5 md:px-2">
            <button 
                v-for="option in options"
                :key="option"
                @click="handleDisplay(option)"
                :aria-label="option"
                class="group p-1 rounded-xl outline-none"
            >
                <component
                    :is="icons[option]"
                    :class="[
                        display === option ? 'text-red-light' : 'text-white group-hover:text-gray-lightest', 
                        'md:size-6 transition duration-200'
                    ]"
                />
            </button>
        </div>
    </div>
</template>

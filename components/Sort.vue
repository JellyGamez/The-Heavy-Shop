<script setup>

import { IconsBottomToTop, IconsTopToBottom } from '#components';

const props = defineProps({
    variant: {
        type: String,
        default: 'items'
    }
})

const emit = defineEmits(['sort'])

const route = useRoute()

const options = props.variant === 'items' ? [
    { id: 'price',        name: 'Price'        },
    { id: 'review-count', name: 'Review count' },
    { id: 'rating',       name: 'Rating'       }
] : [
    { id: 'rating',       name: 'Rating'       },
    { id: 'date-added',   name: 'Date added'   }
]

const icons = {
    'asc'  : IconsBottomToTop,
    'desc' : IconsTopToBottom
}

const direction = ref(route.query?.direction)
const sortBy = ref(route.query?.sortBy)

async function handleSort(option) {
    if (sortBy.value !== option) {
        sortBy.value = option
        direction.value = 'desc'
    }
    else {
        if (direction.value === 'desc')
            direction.value = 'asc'
        else {
            sortBy.value = null
            direction.value = 'desc'
        }
    }

    await navigateTo({
        path: route.path,
        query: {
            ...route.query,
            sortBy: sortBy.value,
            direction: direction.value
        }
    })
    
    emit('sort')
}

</script>

<template>
    <div class="flex gap-1.5 md:gap-2 items-center text-white">
        <p class="hidden sm:block text-sm"> 
            Sort by
        </p>
        <div class="flex flex-wrap gap-1 md:gap-1.5 rounded-2xl bg-gray-dark p-1 md:p-1.5 focus:outline-none">
            <button
                v-for="option in options"
                :key="option.id"
                @click="handleSort(option.id)"
                :aria-label="option.name"
                class="text-sm md:text-base relative group flex items-center gap-0.5 rounded-xl py-1 px-3 pl-8 bg-gray-primary outline-none"
            >
                <transition
                    enter-active-class="transition duration-200"
                    enter-from-class="transform scale-y-0"
                    enter-to-class="transform scale-y-100"
                    leave-active-class="transition duration-200"
                    leave-from-class="transform scale-y-100"
                    leave-to-class="transform scale-y-0"
                >   
                    <component
                        :is="option.id === sortBy ? icons[direction] : icons['desc']"
                        :class="[
                            { 'text-red-light' : option.id === sortBy },
                            'absolute left-2.5 transition duration-200'
                        ]"
                    />
                </transition>
                <span class="transition duration-200 group-hover:text-gray-lightest"> 
                    {{ option.name }} 
                </span>
            </button>
        </div>
    </div>
</template>

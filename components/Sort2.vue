<script setup>

const items = [
    'Default',
    'Newest',
    'Rating',
    'Review count',
    'Price ascending',
    'Price descending'
]
const selected = ref(items[0])

</script>

<template>
    <HeadlessListbox v-model="selected">
        <div class="relative z-10 text-white">
            <HeadlessListboxButton class="group flex items-center justify-center gap-1 hover:cursor-pointer rounded-2xl bg-gray-dark py-2.5 px-4 pr-5 min-w-40 md:min-w-48 focus:outline-none">
                <IconsArrowsUpDown class="!size-5 md:!size-6 text-red-light" />
                <span class="text-sm md:text-base group-hover:text-red-light transition duration-200"> {{ selected }} </span>
            </HeadlessListboxButton>

            <transition
                enter-active-class="transition duration-200 ease-in-out"
                enter-from-class="transform scale-y-0 opacity-0"
                enter-to-class="transform scale-100"
                leave-active-class="transition duration-200 ease-in-out"
                leave-from-class="transform scale-100"
                leave-to-class="transform scale-y-0 opacity-0"
            >
                <HeadlessListboxOptions class="origin-top absolute flex flex-col gap-1 mt-2 max-h-64 overflow-auto w-full rounded-2xl bg-gray-lighter text-base shadow-lg focus:outline-none sm:text-sm p-1">
                    <HeadlessListboxOption 
                        v-for="item in items" 
                        :key="item.name" 
                        :value="item" 
                        v-slot="{ active, selected }" 
                        class="text-white text-sm"
                    >
                        <li
                            @click="$emit('select', item)"
                            :class="[
                                { 'bg-gray-primary' : active || selected },
                                'hover:cursor-pointer w-full items-center rounded-xl py-2 px-2 transition duration-200',
                            ]"
                        >
                            {{ item }}
                        </li>
                    </HeadlessListboxOption>
                </HeadlessListboxOptions>
            </transition>
        </div>
    </HeadlessListbox>
</template>

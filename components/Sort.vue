<script setup>

const items = [
    { name: 'Default', orderBy: 'Default', sort: false       },
    { name: 'Newest', orderBy: 'Date added', sort: 'desc'    },
    { name: 'Oldest', orderBy: 'Date added', sort: 'asc'     },
    { name: 'Highest rated', orderBy: 'Rating', sort: 'desc' },
    { name: 'Lowest rated', orderBy: 'Rating', sort: 'asc'   },
]
const selected = ref(items[0])

</script>

<template>
    <HeadlessListbox v-model="selected">
        <div class="relative z-10 text-white">
            <HeadlessListboxButton class="group flex items-center justify-center gap-1 hover:cursor-pointer rounded-2xl bg-gray-dark py-2.5 px-4 pr-5 min-w-40 md:min-w-44 focus:outline-none">
                <IconsSort class="!size-5 md:!size-6 text-red-light" />
                <span class="text-sm md:text-base group-hover:text-red-light transition duration-200"> {{ selected.name }} </span>
            </HeadlessListboxButton>

            <transition
                enter-active-class="transition duration-200 ease-in-out"
                enter-from-class="transform scale-y-0 opacity-0"
                enter-to-class="transform scale-100"
                leave-active-class="transition duration-200 ease-in-out"
                leave-from-class="transform scale-100"
                leave-to-class="transform scale-y-0 opacity-0"
            >
                <HeadlessListboxOptions class="origin-top absolute flex flex-col gap-1 mt-2 max-h-60 overflow-auto w-full rounded-2xl bg-gray-lighter text-base shadow-lg focus:outline-none sm:text-sm p-1">
                    <HeadlessListboxOption v-slot="{ active, selected }" v-for="item in items" :key="item.name" :value="item" class="text-white text-sm">
                        <li
                            @click="$emit('select', item.orderBy, item.sort)"
                            :class="[
                                { 'bg-gray-primary' : active || selected },
                                'hover:cursor-pointer w-full items-center rounded-xl py-2 px-2 transition duration-200',
                            ]"
                        >
                            {{ item.name }}
                        </li>
                    </HeadlessListboxOption>
                </HeadlessListboxOptions>
            </transition>
        </div>
    </HeadlessListbox>
</template>
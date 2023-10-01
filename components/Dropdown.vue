<script setup>

const props = defineProps({
    options: Array
})

</script>

<template>
    <div class="text-right">
        <HeadlessMenu as="div" class="relative inline-block">
            <HeadlessMenuButton class="align-top">
                <slot />
            </HeadlessMenuButton>

                <transition
                    enter-active-class="transition duration-200 ease-in-out"
                    enter-from-class="transform scale-y-0"
                    enter-to-class="transform scale-100"
                    leave-active-class="transition duration-200 ease-in-out"
                    leave-from-class="transform scale-100"
                    leave-to-class="transform scale-y-0"
                >
                <HeadlessMenuItems class="absolute w-32 mt-2 origin-top left-1/2 -translate-x-1/2 rounded-xl bg-gray-light shadow-lg ring-1 ring-black ring-opacity-10 focus:outline-none">
                    <div v-for="option in options" :key="option.name" class="p-1">
                        <HeadlessMenuItem v-slot="{ active }">
                            <NuxtLink 
                                v-if="option.url"
                                :to="option.url"
                                :class="[
                                    { 'bg-gray-dark' : active },
                                    'group flex w-full items-center rounded-xl px-2 py-2 text-white text-sm text-center transition duration-200 ',
                                ]"
                            >
                                {{ option.name }}
                            </NuxtLink>
                            <button
                                v-else
                                @click="$emit('action', option.action)"
                                :class="[
                                    { 'bg-gray-dark' : active },
                                    'group flex w-full items-center rounded-xl px-2 py-2 text-white text-sm text-center transition duration-200 ',
                                ]"
                            >
                                {{ option.name }}
                            </button>
                        </HeadlessMenuItem>
                    </div>
                </HeadlessMenuItems>
            </transition>
        </HeadlessMenu>
    </div>
</template> 
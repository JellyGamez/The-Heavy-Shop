<script setup>

const props = defineProps({
    options: Array
})

const emit = defineEmits(['action'])

const router = useRouter()

function handleClick(option) {
    if (option.url)
        router.push({ path: option.url })
    else if (option.action)
        emit('action', option.action)
}

</script>

<template>
    <div class="text-right">
        <HeadlessMenu as="div" class="relative inline-block">
            <HeadlessMenuButton class="align-top">
                <slot />
            </HeadlessMenuButton>
                <transition
                    enter-active-class="transition duration-200 ease-in-out"
                    enter-from-class="transform scale-y-0 opacity-0"
                    enter-to-class="transform scale-100"
                    leave-active-class="transition duration-200 ease-in-out"
                    leave-from-class="transform scale-100"
                    leave-to-class="transform scale-y-0 opacity-0"
                >
                <HeadlessMenuItems class="absolute w-32 mt-2 origin-top left-1/2 -translate-x-1/2 rounded-xl bg-gray-lighter shadow-lg focus:outline-none">
                    <div v-for="option in options" class="p-1 text-white text-sm">
                        <HeadlessMenuItem v-slot="{ active }">
                            <button
                                @click="handleClick(option)"
                                :class="[
                                    { 'bg-gray-primary' : active },
                                    'flex w-full items-center rounded-xl px-2 py-2 transition duration-200',
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

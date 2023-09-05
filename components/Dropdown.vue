<script setup>

const { signOut } = useAuth()

async function handleAction(action)
{
    if (action == 'signOut')
        await signOut()
}

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
                enter-active-class="transition duration-200 ease-out" 
                enter-from-class="translate-y-1 opacity-0"
                enter-to-class="translate-y-0 opacity-100" 
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="translate-y-0 opacity-100" 
                leave-to-class="translate-y-1 opacity-0"
            >
                <HeadlessMenuItems
                    class="absolute w-32 mt-2 origin-top-right -right-2 rounded-xl bg-gray-light shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                    <div v-for="option in options" :key="option.name" class="px-1 py-1">
                        <HeadlessMenuItem v-slot="{ active }">
                            <NuxtLink 
                                v-if="option.url"
                                :to="option.url"
                                :class="[
                                    { 'bg-red-primary' : active },
                                    'group flex w-full items-center rounded-xl px-2 py-2 text-white text-sm text-center transition duration-200 ',
                                ]"
                            >
                                {{ option.name }}
                            </NuxtLink>
                            <button
                                v-else
                                @click="handleAction(option.action)"
                                :class="[
                                    { 'bg-red-primary' : active },
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
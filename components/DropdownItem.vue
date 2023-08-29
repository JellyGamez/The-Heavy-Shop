<script setup>

const props = defineProps({
    option: Object
})
const { status, signIn, signOut } = useAuth()
</script>
<template>
    <HeadlessMenuItem v-slot="{ active }">
        <div :class="[
            { 'bg-red-primary': active },
            'group flex w-full items-center rounded-xl px-2 py-2 text-white text-sm text-center transition duration-200 ',
        ]">
            <NuxtLink v-if="option.url" :to="option.url">
                {{ option.name }}
            </NuxtLink>
            <button v-else>
                
            </button>
        </div>
    </HeadlessMenuItem>
</template>
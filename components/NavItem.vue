<script setup>

const props = defineProps({
    to: String,
    action: String
})

const route = useRoute()

function match(url) {
    return '/' + route.name?.replace('-', '/') == url || route.name == 'index' && url == '/'
}

</script>

<template>
    <NuxtLink v-if="to" :to="to">
        <p :class="match(to) ? 'text-red-primary' : 'text-white'"
            class="hover:text-red-primary text-lg transition duration-200">
            <slot />
        </p>
    </NuxtLink>
    <button v-else @click="$emit('action', action)">
        <p class="text-white hover:text-red-primary text-lg transition duration-200">
            <slot />
        </p>
    </button>
</template>
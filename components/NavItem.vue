<script setup>

const props = defineProps({
    to: {
        type: String,
        requied: true
    }
})

const route = useRoute()

function match(url) {
    return '/' + route.name == url || route.name == 'index' && url == '/'
}

</script>

<template>
    <NuxtLink :to="to">
        <p :class="match(to) ? 'text-red-primary' : 'text-white'"
            class="hover:text-red-primary text-lg transition duration-200">
            <slot />
        </p>
    </NuxtLink>
</template>
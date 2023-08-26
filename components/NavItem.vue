<script setup>

const props = defineProps({
    to: {
        type: String,
        requied: true
    }
})
</script>

<template>
    <NuxtLink :to="to">
        <p :class=" '/' + $route.name == to ? 'text-red-primary' : 'text-white'"
            class="hover:text-red-primary  font-medium text-xl transition duration-200"
        >
            <slot/>
        </p>
    </NuxtLink>
</template>
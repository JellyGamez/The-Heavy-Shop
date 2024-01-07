<script setup>

useHead({
    title: 'Favorites',
    meta: [
        { name: 'description', content: 'Favorites' }
    ],
})

</script>
<template>
    {{ $route.params.id }}
</template>

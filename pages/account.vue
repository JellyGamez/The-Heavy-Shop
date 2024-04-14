<script setup>

useHead({
    title: 'Account',
    meta: [
        { name: 'description', content: 'Account' }
    ],
})

definePageMeta({
    layout: 'auth',
    middleware: 'auth',
})

</script>

<template>
    <div>
        hello
    </div>
</template>
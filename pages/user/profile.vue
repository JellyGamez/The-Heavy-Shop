<script setup>

useHead({
    title: 'Profile',
    meta: [
        { name: 'description', content: 'Profile' }
    ],
})

definePageMeta({
    middleware: 'auth',
    redirect: '/auth/login'
})

const { data } = await useFetch('/api/session')

</script>

<template>
    <div>
        Profile page
        <pre>
            {{ data }}
        </pre>
    </div>
</template>
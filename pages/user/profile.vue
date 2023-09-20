<script setup>

useHead({
    title: 'Profile',
    meta: [
        { name: 'description', content: 'Profile' }
    ],
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
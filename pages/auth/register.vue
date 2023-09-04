<script setup>

definePageMeta({
  middleware: 'auth',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
})

</script>

<template>
    <div>
        
    </div>
</template>
<script setup>

useHead({
    title: 'Error - The Heavy Shop',
    meta: [
        { name: 'description', content: 'Error' }
    ],
})

const props = defineProps({
    error: Object
})

const handleError = () => clearError({ redirect: '/' })

</script>

<template>
    <NuxtLayout name="auth">
        <AuthCard 
            :title="`Error ${error.statusCode}`" 
            :description="error.statusCode == 404 ? `The page you were looking for couldn't be found.` : error.message"
        > 
            <Button @click="handleError" class="w-full">
                Go back home
            </Button>
        </AuthCard>
    </NuxtLayout>
</template>
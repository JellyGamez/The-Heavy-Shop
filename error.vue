<script setup>

const props = defineProps({
    error: Object
})

const handleError = () => clearError({ redirect: '/' })

</script>

<template>
    <NuxtLayout>
        <div class="bg-gray-light min-h-full flex flex-col items-center justify-center">
            <AuthCard :title="`Error ${error.statusCode}`" :description="error.statusCode == 404 ? `The page you were looking for couldn't be found.` : error.message">
                
                <Button @click="handleError" class="w-full">
                    Go back home
                </Button>
            </AuthCard>
        </div>
    </NuxtLayout>
</template>
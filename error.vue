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
    <div>
        <Header />
        <div class="pt-16 min-h-screen bg-gray-light flex flex-col items-center justify-center">
            <div class="w-full flex justify-center p-4">
                <div class="w-full max-w-sm bg-gray-dark p-5 rounded-2xl">
                    <div class="mb-6">
                        <h1 class="text-center text-red-primary text-[26px] font-medium mb-3"> 
                            {{ `Error ${error.statusCode}` }} 
                        </h1>
                        <p class="text-center text-white font-extralight text-sm">
                            {{ error.statusCode == 404 ? `The page you were looking for couldn't be found.` : error.message }}
                        </p>
                    </div>
                    <Button @click="handleError" class="w-full">
                        Go back home
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>

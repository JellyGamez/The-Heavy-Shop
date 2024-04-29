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

const router = useRouter()

</script>

<template>
    <div>
        <Header />
        <div class="pt-16 min-h-screen bg-gray-light flex flex-col items-center justify-center">
            <div class="flex justify-center w-full px-2 py-4">
                <div class="w-full max-w-sm bg-gray-dark p-4 sm:p-5 rounded-2xl">
                    <div class="mb-6">
                        <h1 class="text-center text-red-primary text-2xl sm:text-[26px] font-medium mb-3"> 
                            {{ `Error ${error.statusCode}` }} 
                        </h1>
                        <p class="text-center text-white font-extralight text-sm">
                            {{ error.statusCode === 404 ? `The page you were looking for couldn't be found.` : error.message }}
                        </p>
                    </div>
                    <Button @click="() => { clearError(); router.back() }" class="w-full">
                        GO BACK
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>

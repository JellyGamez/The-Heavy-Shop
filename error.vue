<script setup>

useHead({
    title: 'Error - The Heavy Shop',
})

const props = defineProps({
    error: Object
})

const router = useRouter()

</script>

<template>
    <div>
        <Header />
        <div class="pt-16 min-h-screen bg-gray-light flex flex-col items-center justify-center pb-[57px] -mb-[57px]">
            <div class="flex justify-center w-full px-2 py-4">
                <div class="w-full max-w-sm bg-gray-dark p-4 sm:p-5 rounded-2xl">
                    <div class="mb-6">
                        <h1 class="text-center text-red-primary text-2xl sm:text-[26px] font-medium mb-3"> 
                            {{ `Error ${error?.statusCode}` }} 
                        </h1>
                        <p class="text-center text-white font-extralight text-sm break-words">
                            {{ error?.statusMessage?.length === 0 ? 'Something went wrong.' : error?.statusMessage }}
                        </p>
                    </div>
                    <Button 
                        @click="() => { 
                            clearError() 
                            router.back() 
                        }"
                        class="w-full"
                    >
                        <span> GO BACK </span>
                        <IconsDoubleChevronRight class="!size-4" />
                    </Button>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<style scoped>

.break-words {
    overflow-wrap: anywhere;
}

</style>

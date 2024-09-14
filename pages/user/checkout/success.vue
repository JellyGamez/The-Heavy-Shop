<script setup>

useHead({
    title: 'Success',
})

definePageMeta({
    layout: 'auth',
    middleware: ['auth', 'checkout']
})

</script>

<template>

    <div class="w-full max-w-sm bg-gray-dark p-4 pt-7 sm:p-5 sm:pt-8 rounded-2xl">
        <div class="mb-6">
            <h1 class="text-center text-[#51ad3d] text-2xl sm:text-[26px] font-medium mb-4 flex gap-1 items-center justify-center">
                <IconsCheck class="!size-7" />
                <span> Payment successful </span>
            </h1>
            <p class="text-center text-white font-extralight text-sm">
                Thank you for your purchase! We'll send you a confirmation email with the details of your order.
            </p>
        </div>
        <NuxtLink 
            to="/" 
            class="w-full"
        >
            <Button class="hover:!ring-[#51ad3d]">
                <span> GO BACK </span>
                <IconsDoubleChevronRight class="!size-4" />
            </Button>
        </NuxtLink>
    </div>
</template>

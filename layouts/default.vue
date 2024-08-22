<script setup>

useSync()

</script>

<template>
    <SearchModal />
    <Header />
    <div class="pt-16 min-h-screen pb-[57px] -mb-[57px] bg-gray-light w-screen">
        <div class="mx-auto min-h-full w-full px-2 sm:px-4 md:px-7 lg:px-10 py-4 md:py-6 lg:py-8 max-w-5xl xl:max-w-8xl">
            <slot />
        </div>
    </div>
    <Footer />
</template>

<template>
    <Header />
    <div class="pt-16 min-h-screen pb-[57px] -mb-[57px] bg-gray-light flex flex-col items-center justify-center">
        <div class="flex justify-center w-full px-2 py-4">
            <slot />
        </div>
    </div>
    <Footer />
</template>

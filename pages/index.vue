<script setup>

definePageMeta({
    layout: 'home'
})

useHead({
    meta: [
        { name: 'description', content: '\
            Your premier destination for licensed heavy metal merchandise. \
            We offer a curated selection of apparel, accessories, and collectibles, all designed to celebrate the style you love. \
            Explore our extensive collection and discover the perfect items to express your passion for the genre!'
        }
    ],
})

</script>

<template>
    <div class="bg-[url('/img/texture.webp')] bg-cover min-h-full xl:h-full flex">
        <div class="flex-1 bg-gray-dark bg-opacity-90 pt-8 px-4 md:px-10 lg:px-20 grid grid-cols-1 xl:grid-cols-2 gap-8 overflow-x-hidden">
            <div class="flex items-center justify-center text-white text-3xl sm:text-5xl font-bold">
                <div class="flex flex-col gap-8 mb-8 text-center xl:text-left font-ubuntu">
                    <span>
                        We bring the 
                        <br>
                        <span class="text-4xl sm:text-6xl text-red-primary underline-effect"> 
                            HEAVY STUFF. 
                        </span> 
                        <br>
                    </span>

                    <span>
                        You rock the 
                        <br>
                        <span class="text-4xl sm:text-6xl text-red-primary underline-effect"> 
                            ATTITUDE.
                        </span>
                        <br>
                    </span>

                    <span class="text-base sm:text-lg font-light max-w-2xl font-kanit">
                        The Heavy Shop - your premier destination for licensed heavy metal merchandise. 
                        We offer a curated selection of apparel, accessories, and collectibles, all designed to celebrate the style you love. 
                        <br />
                        <br />
                        Explore our extensive collection and discover the perfect items to express your passion for the genre!
                    </span>

                    <NuxtLink to="/shop" class="w-fit mx-auto xl:mx-0">
                        <Button variant="secondary" size="large" class="font-kanit">
                            SHOP NOW
                            <IconsDoubleChevronRight />
                        </Button>
                    </NuxtLink>
                </div>
            </div>

            <div class="overflow-hidden xl:-mr-20 mt-auto xl:mt-0">
                <NuxtImg 
                    src="/img/2.webp" 
                    alt="Muscular man wearing our merch"
                    class="max-w-sm w-full xl:max-w-none xl:w-auto xl:h-full mx-auto text-white"
                    preload
                />
            </div>
        </div>
    </div>
</template>

<style scoped>

.underline-effect {
    position: relative;
}
.underline-effect::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 4px;
    background-color: #C70404;
    bottom: 0;
    left: 0;
    transform-origin: right;
    transform: scaleX(0);
    transition: transform .40s;
}
@media screen and (max-width: 640px) {
    .underline-effect::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 3px;
        border-radius: 4px;
        background-color: #C70404;
        bottom: 0;
        left: 0;
        transform-origin: right;
        transform: scaleX(0);
        transition: transform .40s;
    }
}
.underline-effect:hover::before {
    transform-origin: left;
    transform: scaleX(1);
}

</style>

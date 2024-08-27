<script setup>

definePageMeta({
    layout: 'home'
})

useHead({
    meta: [{ 
        name: 'description', content: '\
        Your premier destination for licensed heavy metal merchandise. \
        We offer a curated selection of apparel, accessories, and collectibles, all designed to celebrate the style you love. \
        Explore our extensive collection and discover the perfect items to express your passion for the genre!'
    }],
})

const { data: items } = await useAsyncData('items', () => $fetch('/api/item', {
    query: {
        sortBy: 'review-count',
        direction: 'desc'
    }
}))

const favorites = useFavorites()
const userFavorites = ref(await favorites.getIds())

function isFavorite(id) {
    return userFavorites?.value?.some(item => item === id)
}

const toggleFavorite = useDebounceFn(async (id) => {
    if (isFavorite(id))
        await favorites.removeItem(id)
    else
        await favorites.addItem(id)
    userFavorites.value = await favorites.getIds()
})

</script>

<template>
    <div>
        <div class="bg-[url('/img/texture.webp')] bg-cover min-h-screen xl:h-screen pt-16 -mt-16 flex">
            <div class="flex-1 bg-gray-dark bg-opacity-90 pt-8 px-4 md:px-10 lg:px-20 grid grid-cols-1 xl:grid-cols-2 gap-8 overflow-x-hidden">
                <div class="flex items-center justify-center text-white text-3xl sm:text-4xl xl:text-5xl font-bold">
                    <div class="flex flex-col gap-8 mb-8 text-center xl:text-left font-ubuntu">
                        <span>
                            We bring the 
                            <br>
                            <span class="text-4xl sm:text-5xl xl:text-6xl text-red-primary underline-effect"> 
                                HEAVY STUFF. 
                            </span> 
                            <br>
                        </span>

                        <span>
                            You rock the 
                            <br>
                            <span class="text-4xl sm:text-5xl xl:text-6xl text-red-primary underline-effect"> 
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
                            <Button 
                                variant="secondary" 
                                size="large" 
                                class="font-kanit"
                            >
                                <span> SHOP NOW </span>
                                <IconsDoubleChevronRight />
                            </Button>
                        </NuxtLink>
                    </div>
                </div>

                <div class="overflow-hidden xl:-mr-20 mt-auto xl:mt-0">
                    <NuxtImg 
                        src="/img/mascot.webp" 
                        alt="Muscular man wearing our merch"
                        class="max-w-sm w-full xl:max-w-none xl:w-auto xl:h-full mx-auto text-white"
                        preload
                    />
                </div>
            </div>
        </div>
        <div class="bg-gray-light mx-auto px-2 sm:px-4 md:px-7 lg:px-10 py-4 md:py-6 lg:py-8 max-w-5xl xl:max-w-8xl">
            <Banner
                icon="graph-up"
                title="Popular items"
                description="Discover our most sold and appreciated products"
            />
            <Swiper
                :modules="[SwiperNavigation, SwiperPagination]"
                :slides-per-view="5"
                :space-between="12"
                pagination
                class="mt-4 lg:mt-6 mx-auto"
            >
                <SwiperSlide v-for="n in 9" class="pb-10">
                    <GridItemCard :item="items[n - 1]">
                        <Button 
                            @click="toggleFavorite(items[n - 1].id)"
                            aria-label="favorite"
                            class="absolute top-0.5 right-0.5 md:top-1 md:right-1 !p-1.5 h-fit !w-fit !ring-0"
                        > 
                            <ClientOnly>
                                <IconsBookmark
                                    variant="solid"
                                    :class="[
                                        isFavorite(items[n - 1].id) ? 'stroke-gray-primary' : 'text-transparent stroke-white',
                                        '!size-5 transition duration-200'
                                    ]"
                                />
                                <template #fallback>
                                    <IconsBookmark
                                        variant="solid"
                                        class="text-transparent stroke-white !size-5 transition duration-200"
                                    />
                                </template>
                            </ClientOnly>
                        </Button>
                    </GridItemCard>
                </SwiperSlide>
            </Swiper>

            <!-- <div class="rounded-2xl bg-red-light mt-10 lg:mt-14 h-40">
                <NuxtLink to="/shop" class="w-fit mx-auto xl:mx-0">
                    <Button 
                        variant="primary" 
                        size="large"
                        class="!w-fit" 
                    >
                        <span> SHOP NOW </span>
                        <IconsDoubleChevronRight />
                    </Button>
                </NuxtLink>
            </div> -->
        </div>

        <div class="bg-red-light">
            <div class="mx-auto px-2 sm:px-4 md:px-7 lg:px-10 py-4 md:py-6 lg:py-8 max-w-5xl xl:max-w-8xl grid grid-cols-1 lg:grid-cols-2 items-center gap-10 text-white">
                <div class="flex flex-col lg:items-center xl:items-baseline xl:mx-10 text-gray-dark">
                    <p class="text-2xl whitespace-nowrap font-medium">
                        Why choose THE HEAVY SHOP
                    </p>
                    <p class="mt-4 font-medium lg:text-center xl:text-start">
                        Signing up is a breeze — create your account in just a few moments and dive into shopping almost instantly. Enjoy a hassle-free, efficient experience designed to make your shopping as smooth and enjoyable as possible.
                    </p>
                    <div class="flex items-center gap-2 sm:gap-3 shrink-0 mt-6">
                        <NuxtLink to="/auth/login">
                            <Button 
                                variant="primary" 
                                size="medium" 
                                class="!w-28 !ring-0 !bg-gray-dark hover:!text-red-light"
                            > 
                                LOG IN 
                            </Button>
                        </NuxtLink>
                        <span class="mb-1 font-medium"> or </span>
                        <NuxtLink to="/auth/login">
                            <Button 
                                variant="primary" 
                                size="medium"
                                class="!w-28 !ring-0 !bg-gray-dark hover:!text-red-light"
                            > 
                                REGISTER 
                            </Button>
                        </NuxtLink>
                    </div>
                </div>
                <div class="flex flex-col gap-4 xl:mr-10">
                    <div class="flex flex-col items-center gap-2 bg-gray-dark p-3 lg:p-4 xl:w-3/5 rounded-2xl">
                        <div class="flex items-center gap-1.5">
                            <IconsEarth class="size-5 lg:!size-6 text-red-light" />
                            <span class="lg:text-lg font-normal"> Free international shipping </span>
                        </div>
                        <p class="font-light text-center mx-6"> 
                            Wherever you’re from, we’ve got you covered. No need to stress — we’ll take care of everything.
                        </p>
                    </div>
                    <div class="flex flex-col items-center gap-2 bg-gray-dark p-3 lg:p-4 xl:w-3/5 rounded-2xl xl:self-end">
                        <div class="flex items-center gap-1.5">
                            <IconsUndo class="size-5 lg:!size-6 text-red-light" />
                            <span class="lg:text-lg font-normal"> 30-day free refund policy </span>
                        </div>
                        <p class="font-light text-center mx-6"> 
                            We value our customers, so if you’re not satisfied, getting your money back is quick and easy.
                        </p>
                    </div>
                    <div class="flex flex-col items-center gap-2 bg-gray-dark p-3 lg:p-4 xl:w-3/5 rounded-2xl">
                        <div class="flex items-center gap-1.5">
                            <IconsKeyhole class="size-5 lg:!size-6 text-red-light" />
                            <span class="lg:text-lg font-normal"> Secure online payment </span>
                        </div>
                        <p class="font-light text-center mx-6"> 
                            You can shop with confidence, knowing that your information is protected every step of the way.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="my-4 mx-auto px-2 sm:px-4 md:px-7 lg:px-10 py-4 md:py-6 lg:py-8 max-w-5xl xl:max-w-8xl text-white"> 
            <div class="bg-gray-dark rounded-2xl p-1.5 flex items-center justify-between">
                <NuxtImg 
                    src="/img/5.png" 
                    alt="Gallery"
                    class="w-80 h-80 rounded-xl text-white"
                    preload
                />
                <div class="flex flex-col items-center gap-4">
                    <p class="text-2xl">
                        Don’t miss out on our latest merch!
                    </p>
                    <p class="max-w-lg text-center font-light">
                        Get your hands on the hottest heavy metal gear before it's gone! Our exclusive designs are flying off the shelves, so don't wait — grab your favorites now and stand out with the best in metal fashion.
                    </p>
                    <NuxtLink to="/shop" class="w-fit mx-auto xl:mx-0">
                        <Button 
                            variant="secondary" 
                            size="medium" 
                        >
                            <span> SHOP NOW </span>
                            <IconsDoubleChevronRight />
                        </Button>
                    </NuxtLink>
                </div>
                <NuxtImg 
                    src="/img/7.png" 
                    alt="Gallery"
                    class="w-80 h-80 rounded-xl text-white"
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
    transition: transform .4s;
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
        transition: transform .4s;
    }
}
.underline-effect:hover::before {
    transform-origin: left;
    transform: scaleX(1);
}

.swiper {
    --swiper-pagination-color: #FB4242;
    --swiper-pagination-left: auto;
    --swiper-pagination-right: 8px;
    --swiper-pagination-bottom: 8px;
    --swiper-pagination-top: auto;
    --swiper-pagination-fraction-color: inherit;
    --swiper-pagination-progressbar-bg-color: rgba(0, 0, 0, 0.25);
    --swiper-pagination-progressbar-size: 4px;
    --swiper-pagination-bullet-size: 8px;
    --swiper-pagination-bullet-width: 8px;
    --swiper-pagination-bullet-height: 8px;
    --swiper-pagination-bullet-inactive-color: #171717;
    --swiper-pagination-bullet-inactive-opacity: 0.75;
    --swiper-pagination-bullet-opacity: 1;
    --swiper-pagination-bullet-horizontal-gap: 4px;
    --swiper-pagination-bullet-vertical-gap: 6px;
}

</style>

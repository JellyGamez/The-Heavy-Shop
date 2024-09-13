<script setup>

definePageMeta({
    layout: 'home'
})

const status = useStatus()

const { data } = await useFetch('/api/item', {
    query: {
        sortBy: 'rating',
        direction: 'desc'
    }
})

const favorites = useFavorites()
const userFavorites = ref(await favorites.getIds())

const items = ref(data.value.items.map(item => { 
    return { 
        ...item, 
        favorite: isFavorite(item.id)
    } 
}))

function isFavorite(id) {
    return userFavorites?.value?.some(item => item === id)
}

const toggleFavorite = useDebounceFn(async (id) => {
    const item = items.value.find(item => item.id === id)
    if (item.favorite)
        await favorites.removeItem(id)
    else
        await favorites.addItem(id)
    item.favorite = !item.favorite
})

const features = [
    { 
        icon: 'earth',
        title: 'Free international shipping',
        description: 'Wherever you’re from, we’ve got you covered. No need to stress — we’ll take care of everything.'
    },
    {
        icon: 'undo',
        title: '30-day free refund policy',
        description: 'We value our customers, so if you’re not satisfied, getting your money back is quick and easy.'
    },
    {
        icon: 'keyhole',
        title: 'Secure online payment',
        description: 'You can shop with confidence, knowing that your information is protected every step of the way.'
    }
]

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
        <div class="mx-auto px-2 sm:px-4 md:px-7 lg:px-10 py-4 md:py-6 lg:py-8 max-w-5xl xl:max-w-8xl">
            <Banner
                icon="graph-up"
                title="Popular items"
                description="Discover our most sold and appreciated products"
            />
            <Swiper
                :modules="[SwiperNavigation, SwiperPagination, SwiperAutoplay]"
                :slides-per-view="2"
                :space-between="8"
                :breakpoints="{
                    '640': {
                        slidesPerView: 3,
                        spaceBetween: 12
                    },
                    '920': {
                        slidesPerView: 4,
                        spaceBetween: 12
                    },
                    '1280': {
                        slidesPerView: 5,
                        spaceBetween: 12
                    }
                }"
                :autoplay="{
                    delay: 2500,
                    disableOnInteraction: true
                }"
                pagination
                class="mt-4 lg:mt-6"
            >
                <SwiperSlide v-for="n in 9" class="pb-10 ">
                    <GridItemCard :item="items[n - 1]" class="mx-auto">
                        <Button 
                            @click="toggleFavorite(items[n - 1].id)"
                            aria-label="favorite"
                            class="absolute top-0.5 right-0.5 md:top-1 md:right-1 !p-1.5 h-fit !w-fit !ring-0"
                        > 
                            <ClientOnly>
                                <IconsBookmark
                                    variant="solid"
                                    :class="[
                                        items[n - 1].favorite ? 'stroke-gray-primary' : 'text-transparent stroke-white',
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
        </div>
        <div class="bg-red-light mb-8 md:mb-10 lg:mb-12 overflow-hidden">
            <div class="mx-auto px-2 sm:px-4 md:px-7 lg:px-10 py-8 max-w-5xl xl:max-w-8xl grid grid-cols-1 lg:grid-cols-2 items-center gap-10 text-white relative">
                <div class="mx-auto max-w-lg lg:max-w-none flex flex-col items-center xl:items-baseline xl:mx-10 text-gray-dark relative z-20">
                    <p class="flex flex-wrap justify-center text-xl lg:text-2xl font-medium">
                        <span> Why choose &nbsp </span>
                        <span class="text-white"> THE HEAVY SHOP </span>
                    </p>
                    <p class="text-sm lg:text-base mx-1 mt-4 font-medium text-center xl:text-start">
                        Signing up is a breeze — create your account in just a few moments and dive into shopping almost instantly. 
                        Enjoy a hassle-free, efficient experience designed to make your shopping as smooth and enjoyable as possible.
                    </p>
                    <div 
                        v-if="status"
                        class="flex items-center gap-2 sm:gap-3 shrink-0 mt-6"
                    >
                        <NuxtLink to="/user/account">
                            <Button 
                                variant="primary" 
                                size="medium"
                                class="!w-32 !ring-0 !bg-gray-dark hover:!text-red-light"
                            > 
                                <span> ACCOUNT </span>
                                <IconsDoubleChevronRight class="!size-4" />
                            </Button>
                        </NuxtLink>
                    </div>
                    <div 
                        v-else
                        class="flex items-center gap-2 sm:gap-3 shrink-0 mt-6"
                    >
                        <NuxtLink to="/auth/login">
                            <Button 
                                variant="primary" 
                                size="medium" 
                                class="!w-32 !ring-0 !bg-gray-dark hover:!text-red-light"
                            > 
                                <IconsLogin class="!size-[18px]" />
                                <span> LOG IN </span>
                            </Button>
                        </NuxtLink>
                        <span class="mb-1 font-medium"> or </span>
                        <NuxtLink to="/auth/register">
                            <Button 
                                variant="primary" 
                                size="medium"
                                class="!w-32 !ring-0 !bg-gray-dark hover:!text-red-light"
                            > 
                                <IconsRegister class="!size-[18px]" />
                                <span> REGISTER </span>
                            </Button>
                        </NuxtLink>
                    </div>
                </div>
                <div class="flex flex-col gap-3 md:gap-4 xl:mr-10 z-20">
                    <FeatureCard 
                        v-for="feature in features"
                        :feature="feature"
                        class="xl:w-3/5 even:xl:self-end max-w-lg lg:max-w-none self-center lg:self-auto"
                    />
                </div>
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
    background-color: #D4171E;
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
        background-color: #D4171E;
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

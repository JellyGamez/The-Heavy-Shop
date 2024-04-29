<script setup>

const props = defineProps({
    item: Object
})

const isFavorite = ref(props.item.favorite)

</script>

<template>
    <div class="flex flex-col max-w-sm w-full h-full p-1 md:p-1.5 gap-2 rounded-2xl text-white bg-gray-dark">
        <div class="relative">
            <NuxtLink :to='`/item/${item.id}`'>
                <NuxtImg 
                    :src="item.photoUrl" 
                    :alt="item.name" 
                    class="h-48 xl:h-56 w-full object-cover rounded-xl" 
                    preload 
                />
            </NuxtLink>
                <button 
                    @click="() => { $emit('toggleFavorite'); isFavorite = !isFavorite }"
                    class="absolute top-0.5 right-0.5 md:top-1 md:right-1 p-1.5 bg-gray-primary rounded-xl shrink-0 h-fit w-fit focus:outline-none" 
                > 
                    <ClientOnly>
                        <IconsBookmark
                            variant="solid"
                            :class="[
                                isFavorite ? 'stroke-gray-primary' : 'text-gray-primary stroke-white',
                                '!w-[18px] !h-[18px] sm:!w-[22px] sm:!h-[22px] transition duration-200'
                            ]"
                        />
                        <template #fallback>
                            <IconsBookmark
                                variant="solid"
                                class="text-gray-primary stroke-white !w-[18px] !h-[18px] sm:!w-[22px] sm:!h-[22px] transition duration-200"
                            />
                        </template>
                    </ClientOnly>
                </button>
        </div>
        
        <div class="flex flex-col mx-2">
            <NuxtLink :to='`/item/${item.id}`'>
                <p class="text-base md:text-lg h-11 md:h-14 leading-snug line-clamp-2"> {{ item.name }} </p>
            </NuxtLink>
            <div class="flex flex-wrap-reverse justify-between items-center w-full gap-2 mt-2">
                <p class="text-sm md:text-base"> $ {{ item.price }} </p>
                <div class="flex items-center mb-0.5 gap-1.5">
                    <Rating :rating="item.rating"  />
                    <p class="text-gray-lightest"> ({{ item.reviews.length }}) </p>
                </div>
            </div>
        </div>

        <div class="flex items-end h-full">
            <Button size="small" @click="$emit('addToCart')"> 
                <IconsShoppingCart class="!w-4 !h-4 sm:mb-0.5" />
                <span> Add to cart </span>
            </Button>
        </div>
    </div>
</template>

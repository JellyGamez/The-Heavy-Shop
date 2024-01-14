<script setup>

const props = defineProps({
    item: Object
})

const favorites = useFavorites()

const favorite = ref(false)

</script>

<template>
    <div class="flex flex-col max-w-sm w-full h-full p-1 md:p-1.5 gap-2 rounded-2xl text-white bg-gray-dark">
        <div class="relative">
            <NuxtImg 
                :src="item.photoUrl" 
                :alt="item.name" 
                class="rounded-xl h-48 xl:h-56 object-cover" 
                preload 
            />
            <button 
                @click="favorites.addItem(item.id), favorite = !favorite"
                class="absolute top-0.5 right-0.5 md:top-1 md:right-1 p-1.5 bg-gray-primary rounded-xl shrink-0 h-fit w-fit focus:outline-none" 
            > 
                <IconsBookmark
                    variant="solid"
                    class="!w-[18px] !h-[18px] sm:!w-[22px] sm:!h-[22px] transition duration-200" 
                    :class="favorite ? 'stroke-gray-primary' : 'text-gray-primary stroke-white'"
                />
            </button>
        </div>
        
        <div class="flex flex-col mx-2">
            <p class="text-base md:text-lg h-11 md:h-14 leading-snug"> {{ item.name }} </p>
            <div class="flex flex-wrap-reverse justify-between items-center w-full gap-2 mt-2">
                <p class="text-sm md:text-base font-medium"> $ {{ item.price }} </p>
                <div class="flex mb-0.5">
                    <IconsStar v-for="n in 4" class="text-yellow-500" />
                    <IconsStar v-for="n in 1" class="text-gray-light" />
                </div>
            </div>
        </div>

        <div class="flex items-end h-full">
            <Button size="small" class="w-full flex items-center justify-center space-x-1"> 
                <IconsShoppingCart class="!w-4 !h-4 sm:mb-0.5" />
                <span> Add to cart </span>
            </Button>
        </div>
    </div>
</template>

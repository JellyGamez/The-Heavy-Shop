<script setup>

const props = defineProps({
    item: Object
})

const favorites = useFavorites()

</script>

<template>
    <div class="flex flex-col max-w-sm w-full p-2 rounded-2xl gap-2 text-white bg-gray-dark ">
        <div class="relative">
            <NuxtImg :src="item.photoUrl" :alt="item.name" class="rounded-xl h-56 object-cover" preload />
            <button class="absolute top-1 right-1 p-1.5 bg-gray-primary rounded-xl shrink-0 h-fit w-fit" @click="favorites.addItem(item.id)"> 
                <IconsBookmark class="w-5 h-5" />
            </button>
        </div>
        
        <div class="flex flex-col mx-2">
            <p class="text-lg"> {{ item.name }} </p>
            <div class="flex w-full justify-between items-center">
                <p> $ {{ item.price }} </p>
                <div class="flex my-2">
                    <IconsStar class="w-5 h-5 text-yellow-500" v-for="n in 4" />
                    <IconsStar class="text-gray-light" v-for="n in 1" />
                </div>
            </div>
        </div>
        <Button class="flex items-center justify-center space-x-1"> 
            <IconsShoppingCart class="!w-5 !h-5" />
            <span> Add to cart </span>
        </Button>
    </div>
</template>

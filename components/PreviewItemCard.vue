<script setup>

const props = defineProps({
    item: Object
})

const favorites = useFavorites()

</script>

<template>
    <div class="flex flex-col text-white gap-2 max-w-sm w-full bg-gray-dark rounded-xl p-2">
        <div class="flex items-center justify-between">
            <span class=""> {{ item.name }} </span>
            <button class="p-2 bg-gray-primary rounded-xl shrink-0 h-fit w-fit" @click="favorites.addItem(item.id)"> 
                <IconsBookmark class="w-6 h-6" />
            </button>
        </div>


        <NuxtImg :src="item.photoUrl" :alt="item.name" class="rounded-xl" preload />
        <div class="flex justify-between items-center mx-2">
            <span class="text-lg"> $ {{ item.price }} </span>
            <div class="flex my-2">
                <IconsStar class="w-5 h-5 text-yellow-500" v-for="n in 4" />
                <IconsStar class="text-gray-light" v-for="n in 1" />
            </div>
        </div>


        <div class="flex space-x-2">
            <Button  size="small" class="w-full"> 
                Add to cart 
            </Button>

            
        </div>
        

    </div>
</template>

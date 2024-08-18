<script setup>

const props = defineProps({
    item: Object
})

</script>

<template>
    <div class="flex flex-col max-w-56 sm:max-w-72 w-full h-full p-1 md:p-1.5 gap-2 rounded-2xl text-white bg-gray-dark">
        <div class="relative">
            <NuxtLink :to='`/item/${item.id}`'>
                <NuxtImg 
                    :src="item.photoUrl"
                    :alt="item.name"
                    class="h-48 xl:h-56 w-full object-cover rounded-xl"
                    preload
                />
            </NuxtLink>
            <slot />
        </div>
        
        <div class="flex flex-col mx-2">
            <NuxtLink :to='`/item/${item.id}`'>
                <p class="text-base md:text-lg h-11 md:h-14 leading-snug line-clamp-2"> 
                    {{ item.name }} 
                </p>
            </NuxtLink>
            <div class="justify-self-end flex flex-wrap-reverse justify-between items-center w-full gap-2 mt-2">
                <div class="text-sm md:text-base">
                    <span class="font-extralight">$</span>
                    <span> {{ item.price }} </span>
                </div>
                <div class="flex items-center mb-0.5 gap-1.5">
                    <Rating :rating="item.rating" />
                    <p class="text-gray-lightest"> 
                        ({{ item.reviews.length }}) 
                    </p>
                </div>
            </div>
        </div>

        <div class="flex items-end h-full">
            <NuxtLink :to='`/item/${item.id}`' class="w-full">
                <Button size="small"> 
                    <span> View item </span>
                    <IconsDoubleChevronRight class="!size-3.5" />
                </Button>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    item: Object
})

</script>

<template>
    <div class="relative flex justify-between w-full p-1 md:p-1.5 rounded-2xl bg-gray-dark">
        <div class="flex w-full md:mr-10 lg:mr-20">
            <NuxtLink :to='`/item/${item.id}`' class="shrink-0">
                <NuxtImg 
                    :src="item.photoUrl" 
                    :alt="item.name" 
                    class="w-32 h-32 md:w-44 md:h-44 object-cover rounded-xl" 
                    preload 
                />
            </NuxtLink>
            <div class="flex flex-col w-full justify-between overflow-hidden text-white my-1 md:my-2 mr-2 ml-4 md:ml-6">
                <div>
                    <NuxtLink :to='`/item/${item.id}`'>
                        <p class="text-base md:text-lg truncate w-full"> {{ item.name }} </p>
                        <p class="text-sm md:text-base font-light text-gray-lightest line-clamp-2 w-full"> {{ item.description }} </p>
                    </NuxtLink>
                    <div class="flex items-center my-1 md:my-2 gap-1.5">
                    <Rating :score="item.rating"  />
                    <p class="text-gray-lightest"> ({{ item._count.reviews }}) </p>
                </div>
                </div>
                <p class="text-base md:text-lg"> $ {{ item.price }} </p>
            </div>
        </div>
        <slot name="actions" />
    </div>
</template>

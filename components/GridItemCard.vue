<script setup>

const props = defineProps({
    item: Object
})

</script>

<template>
    <div class="flex flex-col w-full h-full p-1 lg:p-1.5 gap-2 rounded-2xl max-w-sm text-white bg-gray-dark">
        <div class="relative">
            <NuxtLink :to='`/item/${item?.id}`'>
                <NuxtImg 
                    :src="item?.photoUrl"
                    :alt="item?.name"
                    class="w-full h-full object-cover rounded-xl"
                    preload
                    placeholder
                />
            </NuxtLink>
            <slot />
        </div>
        
        <div class="flex flex-col mx-2">
            <NuxtLink :to='`/item/${item?.id}`'>
                <p class="font-light text-base md:text-lg h-10 md:h-14 leading-tight md:leading-6 line-clamp-2"> 
                    {{ item?.name }} 
                </p>
            </NuxtLink>
            <div class="justify-self-end flex flex-wrap-reverse justify-between items-center w-full gap-2 mt-2">
                <div class="text-sm md:text-base mt-[1px] md:mt-0">
                    <span class="font-extralight">$</span>
                    <span> {{ item?.price }} </span>
                </div>
                <div class="flex items-center mb-0.5 gap-1 md:gap-1.5">
                    <Rating :rating="item?.rating" />
                    <p class="text-sm md:text-base text-gray-lightest mt-[1px] -mb-[1px] md:mt-0 md:mb-0"> 
                        ({{ item?.reviews?.length }}) 
                    </p>
                </div>
            </div>
        </div>

        <div class="flex items-end h-full">
            <NuxtLink :to='`/item/${item.id}`' class="w-full">
                <Button 
                    size="small"
                    class="!text-xs sm:!text-sm"
                > 
                    <span> View item </span>
                    <IconsDoubleChevronRight class="!size-3.5" />
                </Button>
            </NuxtLink>
        </div>
    </div>
</template>

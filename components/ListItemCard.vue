<script setup>

const props = defineProps({
    item: Object
})

</script>

<template>
    <div class="relative flex justify-between w-full p-1 md:p-1.5 rounded-2xl bg-gray-dark">
        <div class="flex w-full md:mr-10 lg:mr-20">
            <NuxtLink :to='`/item/${item?.id}`' class="shrink-0">
                <NuxtImg 
                    :src="item?.photoUrl" 
                    :alt="item?.name" 
                    class="size-32 md:size-44 object-cover rounded-xl" 
                    preload 
                />
            </NuxtLink>
            <div class="flex flex-col w-full justify-between overflow-hidden text-white my-1 md:my-2 mr-2 ml-4 md:ml-6">
                <div>
                    <NuxtLink :to='`/item/${item?.id}`'>
                        <p class="text-base md:text-lg truncate w-full"> 
                            {{ item?.name }}
                        </p>
                        <p 
                            :class="[
                                item?.size ? 'line-clamp-1' : 'line-clamp-2',
                                'text-sm md:text-base font-light text-gray-lightest w-full'
                            ]"
                        > 
                            {{ item?.description }}
                        </p>
                        <p v-if="item?.size" class=" md:mt-0.5 text-sm md:text-base"> 
                            <span> Size: </span>
                            <span class="text-red-light"> {{ item?.size }} </span>
                        </p>
                    </NuxtLink>
                    <div class="flex items-center my-1 md:my-1.5 gap-1.5">
                        <Rating :rating="item?.rating" />
                        <p class="text-gray-lightest"> 
                            ({{ item?.reviews?.length }}) 
                        </p>
                    </div>
                </div>
                <div class="text-base md:text-lg whitespace-nowrap">
                    <span class="font-extralight">$</span>
                    <span v-if="item.quantity && item.quantity !== 1"> {{ (item.price * item.quantity).toFixed(2) }} </span>
                    <span v-else> {{ item.price }} </span>
                </div>
            </div>
        </div>
        <slot />
    </div>
</template>

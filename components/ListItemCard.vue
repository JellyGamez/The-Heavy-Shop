<script setup>

const props = defineProps({
    item: Object
})

</script>

<template>
    <div class="flex justify-between w-full p-2 rounded-2xl bg-gray-dark">
        <div class="flex w-full mr-20">
            <NuxtImg :src="item.photoUrl" :alt="item.name" class="w-44 h-44 object-cover rounded-xl" preload />
            <div class="flex flex-col w-full justify-between my-1 text-white ml-8">
                <div>
                    <p class="text-lg truncate"> {{ item.name }} </p>
                    <p class="line-clamp-2 font-light text-neutral-400"> {{ item.description }} </p>
                    <div class="flex my-2">
                        <IconsStar class="text-yellow-500" v-for="n in 4" />
                        <IconsStar class="text-gray-light" v-for="n in 1" />
                    </div>
                </div>
                <p class="text-lg"> $ {{ item.price }} </p>
            </div>
        </div>
        <slot name="actions" />
    </div>
</template>

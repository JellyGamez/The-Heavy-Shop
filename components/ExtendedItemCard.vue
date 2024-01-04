<script setup>

const props = defineProps({
    item: Object
})

</script>

<template>
    <div class="bg-gray-dark p-4 rounded-xl flex justify-between w-ful">
        <div class="flex gap-8">
            <img :src="item.photoUrl" :alt="item.name" class="w-40 h-40 object-cover rounded-xl">
            <div class="flex flex-col text-white">
                <p> {{ item.name }} </p>
                <p> ${{ item.price }} </p>
                <p class="max-w-[60%]"> {{ item.description }} </p>
                <div class="flex">
                    <IconsStar class="text-yellow-500" v-for="n in 5" />
                </div>
                
            </div>
        </div>
        <slot name="actions" />
    </div>
</template>

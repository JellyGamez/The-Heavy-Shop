<script setup>

const props = defineProps({
    item: Object
})

</script>

<template>
    <div class="bg-gray-dark p-4 rounded-xl flex justify-between w-ful">
        <div class="flex gap-8">
            <img src="/img/test.webp" class="w-32 h-32 object-cover">
            <div class="flex flex-col text-white">
                {{ item.name }}
            </div>
        </div>
        <div class="flex gap-2 items-center mr-6">
            <Button class="flex items-center justify-center space-x-1" variant="secondary"> 
                <IconsShoppingCart class="!w-5 !h-5" />
                <p> Add to cart </p>
            </Button>
            <Button class="flex items-center justify-center space-x-1"> 
                <IconsTrashBin class="!w-5 !h-5" />
                <p> Remove </p>
            </Button>
        </div>
    </div>
</template>

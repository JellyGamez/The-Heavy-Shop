<script setup>

useHead({
    title: 'Shop',
    meta: [
        { name: 'description', content: 'Shop' }
    ],
})

</script>

<template>
    <div class="">
        <div class="grid grid-cols-6 gap-4">
            <PreviewProductCard v-for="n in 10" label="Red T-shirt"/>
        </div>
    </div>
</template>

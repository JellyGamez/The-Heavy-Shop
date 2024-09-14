<script setup>

const props = defineProps({
    entries: Array
})

</script>

<template>
    <EHtml lang="en">
        <EText>
            Thank you for your purchase! Your order has been received and it is currently being processed.
            <br>
            Subtotal: ${{ entries.map(entry => entry.item.price * entry.quantity).reduce((x, y) => x + y, 0).toFixed(2) }}
            <br>
            <EText v-for="entry in entries">
                {{ entry.quantity }}x
                <br>
                {{ entry.item.name }}
                <br>
                <template v-if="entry.size !== 'universal'">
                    Size: {{ entry.size }}
                    <br>
                </template>
                ${{ (entry.item.price * entry.quantity).toFixed(2) }}
            </EText>
        </EText>
    </EHtml>
</template>
<script setup>

const props = defineProps({
    url: String,
    page: Number,
    currentitemCount: Number,
    totalItemCount: Number
})

const hasPreviousPage = computed(() => props.page != 1)
const hasNextPage = computed(() => props.page != 10)

</script>

<template>
    <div class="mb-10 flex justify-between items-center p-3 rounded-2xl bg-gray-dark">
        <p class="ml-4 text-white">
            Displaying {{ page * 50 }} to {{ page * 50 + currentItemCount - 1 }} of {{ totalItemCount}} items
        </p>
        <div class="flex space-x-1 font-ubuntu">
            <NuxtLink :to='hasPreviousPage ? `${url}?page=${page - 1}` : ""' >
                <Button 
                    :variant="hasPreviousPage ? 'neutral' : 'disabled'" 
                    :disabled="!hasPreviousPage"
                    class="w-9 h-9 flex items-center justify-center">
                    <IconsChevronLeft class="shrink-0" />
                </Button>
            </NuxtLink>

            <div v-for="n in 10">
                <NuxtLink :to='`${url}?page=${n}`' >
                    <Button :variant="n != page ? 'primary' : 'secondary'" class="font-ubuntu w-9 h-9 flex items-center justify-center">
                        {{ n }}
                    </Button>
                </NuxtLink>
            </div>

            <NuxtLink :to='hasNextPage ? `${url}?page=${Number(page) + 1}` : ""' >
                <Button 
                    :variant="hasNextPage ? 'neutral' : 'disabled'" 
                    :disabled="!hasNextPage"
                    class="w-9 h-9 flex items-center justify-center">
                    <IconsChevronRight class="shrink-0" />
                </Button>
            </NuxtLink>
        </div>
    </div>
</template>
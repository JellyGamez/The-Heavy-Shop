<script setup>

useHead({
    title: 'Favorites',
    meta: [
        { name: 'description', content: 'Favorites' }
    ],
})

const { status } = useAuth()

const loggedIn = computed(() => {
    return status.value === 'authenticated'
})

</script>

<template>
    <div class="flex flex-col items-center sm:items-start text-white">
        <div class="flex items-center space-x-2">
            <IconsBookmark class="w-6 h-6 md:w-8 md:h-8 md:mt-0.5"/>
            <h1 class="text-2xl md:text-4xl text-white">
                Favorites
            </h1>
        </div>
        <p class="text-sm md:text-base">
            Bookmark your favorite items here
        </p>
        <SaveItemsCard v-if="!loggedIn" class="mt-6">
            <p>
                To save your favorite items, please log in or create an account. 
            </p>
            <p class="hidden md:block">
                Your preferences will be stored for future visits. 
            </p>
        </SaveItemsCard>
    </div>
</template>

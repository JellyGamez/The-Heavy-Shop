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

const favorites = [
    { name: 'Lorem ipsum dolor sit amet, adipiscing color sitewsam' },
    // { name: 'Blue Band T-shirt, Latest Edition' },
    // { name: 'Gray Band T-shirt, Latest Edition' },
    // { name: 'White Band T-shirt, Latest Edition' },
    // { name: 'Pink Band T-shirt, Latest Edition' },
]

</script>

<template>
    <div>
        <div class="flex flex-col items-center sm:items-start text-white">
            <div class="flex items-center space-x-2">
                <IconsBookmark class="w-6 h-6 md:w-8 md:h-8 md:mt-0.5" />
                <h1 class="text-2xl md:text-4xl text-white">
                    Favorites
                </h1>
            </div>
            <p class="text-sm md:text-base text-center">
                Bookmark your favorite items here
            </p>
        </div>
        <AuthPrompt v-if="!loggedIn && favorites.length" class="mt-6">
            <p>
                To save your favorite items, please log in or create an account. 
            </p>
            <p class="hidden md:block">
                Your preferences will be stored for future visits. 
            </p>
        </AuthPrompt>
        <div v-if="favorites.length" class="flex flex-col mt-6 space-y-3">
            <ExtendedItemCard v-for="item in favorites" :item="item" />
        </div>
        <EmptyState v-else class="mt-6">
            <template #title>
                No favorite items yet
            </template>
            <template #content>
                <p>
                    Your favorites collection is currently awaiting your personal touch.
                </p>
                <p class="hidden md:block">
                    Explore our store, discover standout items, and build your distinguished favorites selection.
                </p>
            </template>
        </EmptyState>
    </div>
</template>

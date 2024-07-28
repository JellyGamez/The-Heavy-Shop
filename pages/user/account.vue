<script setup>

useHead({
    title: 'Account',
    meta: [
        { name: 'description', content: 'Account' }
    ],
})

definePageMeta({
    middleware: 'auth',
})

const { data: user } = await useFetch('/api/user')

</script>

<template>
<div>
        <div class="sm:ml-1 flex flex-col items-center sm:items-start text-white">
            <div class="flex items-center gap-1.5 lg:gap-2">
                <IconsUser class="size-6 lg:size-7" />
                <h1 class="text-2xl lg:text-3xl">
                    Account
                </h1>
            </div>
            <p class="text-sm lg:text-base text-center">
                Manage your user settings and data
            </p>
        </div>
        <div class="flex flex-col mt-4 lg:mt-6">
            <div class="flex flex-col items-center gap-2 p-3 w-full rounded-2xl bg-gray-dark text-white">
                {{ user }}
                <img :src="user.photoUrl">
            </div>
        </div>
    </div>
</template>
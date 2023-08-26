<script setup>

const loggedIn = true;
const items = [
    { name: 'Home', url: '/' },
    { name: 'Shop', url: '/shop' },
    { name: 'About', url: '/about' },

]

</script>

<template>
    <div class="h-20 bg-neutral-900">
        <div class="max-w-9xl px-4 h-full mx-auto flex items-center justify-between">
            <NuxtLink to="/">
                <img src="./Icons/Logo.png" alt="The Heavy Shop" class="w-72"/>
            </NuxtLink>
            <div class="flex space-x-4">
                
                <NavItem v-for="item in items" :to="item.url">
                    {{ item.name }}
                </NavItem>
            </div>
            <div>

            </div>
        </div>
    </div>
    {{ $route.name }}
</template>
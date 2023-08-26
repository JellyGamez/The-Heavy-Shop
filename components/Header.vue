<script setup>

const loggedIn = true;

const navItems = [
    { name: 'Home',    url: '/'        },
    { name: 'Shop',    url: '/shop'    },
    { name: 'About',   url: '/about'   },
    { name: 'Contact', url: '/contact' }, 
]

const authenticatedItems = [
    { icon: 'shopping-cart', url: '/cart' },
    { icon: 'heart', url: '/favorites' },
    { icon: 'profile', url: '/profile'}
]

const guestItems = [
    { icon: 'shopping-cart', url: '/cart' },
]

</script>

<template>
    <div class="fixed w-full top-0 h-20 bg-neutral-950">
        <div class="px-10 2xl:px-0 max-w-8xl mx-auto h-full flex items-center justify-between">
            <NuxtLink to="/">
                <!-- <img src="./Icons/Logo2.png" alt="The Heavy Shop" class="h-32"/> -->
                <p class="text-red-primary font-bold text-2xl w-56"> THE HEAVY SHOP </p>
            </NuxtLink>
            <div class="flex space-x-4 items-center">
                <NavItem v-for="item in navItems" :to="item.url">
                    {{ item.name }}
                </NavItem>
            </div>
            <div class="w-56">

            </div>
        </div>
    </div>
</template>
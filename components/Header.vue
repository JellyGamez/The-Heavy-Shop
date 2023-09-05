<script setup>

const navItems = [
    { name: 'Home', url: '/' },
    { name: 'Shop', url: '/shop' },
    { name: 'About', url: '/about' },
    { name: 'Contact', url: '/contact' },
]

const { status } = useAuth()

const loggedIn = computed(() => {
    return status.value === 'authenticated'
})

const userOptions = (!loggedIn.value) ? [
    { name: 'Login', url: '/auth/login' },
    { name: 'Register', url: '/auth/register' }
] : [
    { name: 'Sign out', action: 'signOut' }
]

</script>

<template>
    <div class="fixed w-full top-0 z-10 h-16 bg-gray-dark">
        <div class="px-10 2xl:px-0 max-w-8xl mx-auto h-full flex items-center justify-between">
            <div class="w-52">
                <NuxtLink to="/">
                    <!-- <img src="./Icons/Logo2.png" alt="The Heavy Shop" class="h-32"/> -->
                    <p class="text-red-primary hover:text-gray-hover transition duration-200 font-bold text-xl lg:text-2xl font-ubuntu"> 
                        THE HEAVY SHOP 
                    </p>
                </NuxtLink>
            </div>
            <div class="hidden md:flex space-x-3 items-center">
                <NavItem v-for="item in navItems" :key="item.name" :to="item.url">
                    {{ item.name }}
                </NavItem>
            </div>
            <div class="hidden w-52 md:flex justify-center">
                <div class="flex justify-between w-28">
                    <NuxtLink to="/user/favorites">
                        <IconsBookmark class="w-6 h-6 hover:stroke-red-primary transition duration-200" />
                    </NuxtLink>

                    <NuxtLink to="/user/cart">
                        <IconsCart class="w-6 h-6 hover:stroke-red-primary transition duration-200" />
                    </NuxtLink>

                    <Dropdown :options="userOptions">
                        <IconsUser class="w-6 h-6 hover:stroke-red-primary transition duration-200" />
                    </Dropdown>
                </div>
            </div>
        </div>
    </div>
</template>
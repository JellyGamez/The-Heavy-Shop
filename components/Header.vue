<script setup>

const navItems = [
    { name: 'Home',    url: '/'        },
    { name: 'Shop',    url: '/shop'    },
    { name: 'About',   url: '/about'   },
    { name: 'Contact', url: '/contact' }, 
]

const { status, signIn, signOut } = useAuth()

const loggedIn = computed(() => {
    return status.value == 'authenticated';
})

const userOptions = loggedIn ? [
    { name: 'Sign in', url: '/auth/login' },
    { name: 'Sign out', url: 'da'}
] : [
    { name: 'Sign out', url: 'da'}
]

</script>

<template>
    <div class="fixed w-full top-0 z-10 h-20 bg-gray-dark">
        <div class="px-10 2xl:px-0 max-w-8xl mx-auto h-full flex items-center justify-between">
            <div class="w-52">
                <NuxtLink to="/">
                    <!-- <img src="./Icons/Logo2.png" alt="The Heavy Shop" class="h-32"/> -->
                    <p class="text-red-primary font-bold text-2xl"> THE HEAVY SHOP </p>
                </NuxtLink>
            </div>
            <div class="hidden md:flex space-x-4 items-center">
                <NavItem v-for="item in navItems" :key="item.name" :to="item.url">
                    {{ item.name }}
                </NavItem>
            </div>
            <div class="hidden w-52 md:flex justify-center">
                <div class="flex justify-between w-28">
                    <NuxtLink to="/user/favorites">
                        <IconsBookmark/>
                    </NuxtLink>

                    <NuxtLink to="/user/cart">
                        <IconsCart/>
                    </NuxtLink>

                    <Dropdown :options="userOptions">
                        <IconsUser/>
                    </Dropdown>
                    
                </div>
            </div>
        </div>
    </div>
</template>
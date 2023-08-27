<script setup>

const navItems = [
    { name: 'Home',    url: '/'        },
    { name: 'Shop',    url: '/shop'    },
    { name: 'About',   url: '/about'   },
    { name: 'Contact', url: '/contact' }, 
]

const loggedIn = computed(() => {
    return;
})

</script>

<template>
    <div class="fixed w-full top-0 h-20 bg-gray-dark">
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
                <div class="flex space-x-4">
                    <NuxtLink to="/favorites">
                        <IconsBookmark/>
                    </NuxtLink>

                    <NuxtLink to="/cart">
                        <IconsCart/>
                    </NuxtLink>

                    <Dropdown>
                        <IconsUser/>
                    </Dropdown>
                    
                </div>
            </div>
        </div>
    </div>
</template>
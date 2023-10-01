<script setup>

const { status, signOut } = useAuth()

const loggedIn = computed(() => {
    return status.value === 'authenticated'
})

async function handleAction(action)
{
    switch (action)
    {
        case 'signOut':
            await signOut()
            break
        default:
            return
    }
}

const navItems = [
    { name: 'Home',    url: '/'        },
    { name: 'Shop',    url: '/shop'    },
    { name: 'About',   url: '/about'   },
    { name: 'Contact', url: '/contact' },
]

const userOptions = (!loggedIn.value) ? [
    { name: 'Log In',   url: '/auth/login'    },
    { name: 'Register', url: '/auth/register' }
] : [
    { name: 'Profile', url: '/user/profile' },
    { name: 'Log Out', action: 'signOut'    }
]

const open = ref(false)

</script>

<template>
    <div class="fixed w-full top-0 z-10 h-16 bg-gray-dark">
        <div class="px-3 md:px-10 max-w-8xl mx-auto h-full grid grid-cols-3">
            <!-- Mobile menu -->
            <div class="flex md:hidden">
                <HeadlessMenu as="div" class="flex items-center" v-slot="{ open }">
                    <HeadlessMenuButton class="flex items-center">
                        <button class="text-white w-10 h-10 relative focus:outline-none" aria-label="mobile-menu">
                            <div class="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <span aria-hidden="true" class="block absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out" :class="{ 'rotate-45': open,' -translate-y-1.5': !open }" />
                                <span aria-hidden="true" class="block absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out" :class="{ 'opacity-0': open } " />
                                <span aria-hidden="true" class="block absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out" :class="{ '-rotate-45': open, ' translate-y-1.5': !open }" />
                            </div>
                        </button>
                    </HeadlessMenuButton>
                    <transition
                        enter-active-class="transition duration-300 ease-in-out"
                        enter-from-class="transform scale-y-0"
                        enter-to-class="transform scale-y-100"
                        leave-active-class="transition duration-300 ease-in-out"
                        leave-from-class="transform scale-y-100"
                        leave-to-class="transform scale-y-0"
                    >
                        <HeadlessMenuItems class="flex flex-col origin-top justify-center md:hidden absolute top-16 left-0 bg-gray-dark w-full p-4 space-y-2 shadow-2xl">
                            <HeadlessMenuItem v-for="item in navItems" :key="item.name" v-slot="{ close }">
                                <NavItem :to="item.url" @click="close">
                                    {{ item.name }}
                                </NavItem>
                            </HeadlessMenuItem>
                            <br>
                            <div class="flex w-full justify-between">
                                <div class="flex flex-col space-y-2">
                                    <HeadlessMenuItem v-for="option in userOptions" :key="option.name" v-slot="{ close }">
                                        <NavItem :to="option.url" :action="option.action" @action="handleAction" @click="close">
                                            {{ option.name }}
                                        </NavItem>
                                    </HeadlessMenuItem>
                                </div>
                                
                                <div class="flex flex-col justify-center space-y-2">
                                    <NuxtLink to="/user/favorites" id="favorites">
                                        <IconsBookmark class="w-6 h-6 hover:stroke-red-primary transition duration-200" aria-label="favorites" />
                                    </NuxtLink>

                                    <NuxtLink to="/user/cart" id="cart">
                                        <IconsCart class="w-6 h-6 hover:stroke-red-primary transition duration-200" aria-label="cart" />
                                    </NuxtLink>
                                </div>
                            </div>
                        </HeadlessMenuItems>
                    </transition>
                </HeadlessMenu>
            </div>
            <div class="col-start-2 justify-center flex flex-nowrap md:col-start-1 md:justify-start items-center">
                <NuxtLink to="/" class="flex items-center">
                    <!-- <img src="./Icons/Logo2.webp" alt="The Heavy Shop" class="h-32"/> -->
                    <span class="text-red-primary hover:text-gray-hover transition duration-200 font-bold text-xl xl:text-2xl font-ubuntu whitespace-nowrap"> 
                        THE HEAVY SHOP 
                    </span>
                </NuxtLink>
            </div>
            <nav class="hidden md:flex space-x-3 items-center justify-center">
                <NavItem v-for="item in navItems" :key="item.name" :to="item.url">
                    {{ item.name }}
                </NavItem>
            </nav>
            <div class="hidden md:flex items-center justify-end mr-10">
                <div class="flex justify-between space-x-4 items-center">
                    <NuxtLink to="/user/favorites" id="favorites">
                        <IconsBookmark class="w-6 h-6 hover:stroke-red-primary transition duration-200" aria-label="favorites"/>
                    </NuxtLink>

                    <Dropdown :options="userOptions" @action="handleAction">
                        <IconsUser class="w-6 h-6 hover:stroke-red-primary transition duration-200" aria-label="user-menu" />
                    </Dropdown>

                    <NuxtLink to="/user/cart" id="cart">
                        <IconsCart class="w-6 h-6 hover:stroke-red-primary transition duration-200" aria-label="cart" />
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>
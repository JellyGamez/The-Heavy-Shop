<script setup>

const { status, signOut } = useAuth()

const loggedIn = computed(() => {
    return status.value === 'authenticated'
})

async function handleAction(action) {
    switch (action) {
        case 'signOut':
            await signOut()
            break
        default:
            return
    }
}

const navItems = [
    { id: 'home',    name: 'Home',    icon: 'Home',        url: '/'        },
    { id: 'shop',    name: 'Shop',    icon: 'ShoppingBag', url: '/shop'    },
    { id: 'about',   name: 'About',   icon: 'Document',    url: '/about'   },
    { id: 'gallery', name: 'Gallery', icon: 'Gallery',     url: '/gallery' }
]

const userNavItems = [
    { id: 'favorites', name: 'Favorites', icon: 'Bookmark',     url: '/user/favorites' },
    { id: 'cart',      name: 'Cart',      icon: 'ShoppingCart', url: '/user/cart'      }
]

const userOptions = (!loggedIn.value) ? [
    { name: 'Log In',   url: '/auth/login'    },
    { name: 'Register', url: '/auth/register' }
] : [
    { name: 'Log Out',  action: 'signOut'     }
]

</script>

<template>
    <div class="fixed w-[100vw] top-0 z-10 h-16 bg-gray-dark">
        <div class="px-3 md:px-10 max-w-5xl xl:max-w-8xl mx-auto h-full grid grid-cols-3">
            <div class="flex md:hidden">
                <HeadlessMenu as="div" class="flex items-center" v-slot="{ open }">
                    <HeadlessMenuButton class="flex items-center text-white w-10 h-10 relative focus:outline-none" aria-label="mobile-menu">
                        <div class="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <span aria-hidden="true" class="block absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out" :class="{ 'rotate-45': open,' -translate-y-1.5': !open }" />
                            <span aria-hidden="true" class="block absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out" :class="{ 'opacity-0': open } " />
                            <span aria-hidden="true" class="block absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out" :class="{ '-rotate-45': open, ' translate-y-1.5': !open }" />
                        </div>
                    </HeadlessMenuButton>
                    <transition
                        enter-active-class="transition duration-300 ease-in-out"
                        enter-from-class="transform scale-y-0 opacity-0"
                        enter-to-class="transform scale-y-100"
                        leave-active-class="transition duration-300 ease-in-out"
                        leave-from-class="transform scale-y-100"
                        leave-to-class="transform scale-y-0 opacity-0"
                    >
                        <HeadlessMenuItems class="flex flex-col origin-top justify-center md:hidden absolute top-16 left-0 bg-gray-dark space-y-2 w-full p-5 shadow-2xl">
                            <div class="flex flex-col space-y-2 pb-2">
                                <HeadlessMenuItem v-for="item in navItems">
                                    <NavItem 
                                        :label="item.name"
                                        :icon="item.icon"
                                        :url="item.url"
                                        :id="item.id"
                                    />
                                </HeadlessMenuItem>
                            </div>
                            
                            <div class="flex flex-col space-y-2 py-2">
                                <HeadlessMenuItem v-for="item in userNavItems">
                                    <NavItem 
                                        :label="item.name"
                                        :icon="item.icon"
                                        :url="item.url"
                                        :id="item.id"
                                    />
                                </HeadlessMenuItem>
                            </div>

                            <div class="flex flex-col space-y-2 pt-2">
                                <HeadlessMenuItem v-for="option in userOptions">
                                    <NavItem
                                        :label="option.name"
                                        :url="option.url"
                                        :id="option.id"
                                        :action="option.action"
                                        @action="handleAction"
                                    />
                                </HeadlessMenuItem>
                            </div>
                        </HeadlessMenuItems>
                    </transition>
                </HeadlessMenu>
            </div>
            <div class="col-start-2 justify-center flex flex-nowrap md:col-start-1 md:justify-start items-center">
                <NuxtLink to="/" class="flex items-center">
                    <span class="text-red-primary  transition duration-200 font-bold text-xl xl:text-2xl font-ubuntu whitespace-nowrap underline-effect"> 
                        THE HEAVY SHOP
                    </span>
                </NuxtLink>
            </div>
            <div class="hidden md:flex space-x-3 items-center justify-center">
                <NavItem
                    v-for="item in navItems"
                    :label="item.name" 
                    :url="item.url"
                    :id="item.id"
                />
            </div>
            <div class="hidden md:flex items-center justify-end mr-10">
                <div class="flex space-x-4">
                    <NavItem
                        v-for="(item, index) in userNavItems" 
                        :aria-label="item.id"
                        :icon="item.icon"
                        :url="item.url"
                        :class="index ? 'order-3' : 'order-1'"
                    />
                    <Dropdown :options="userOptions" @action="handleAction" class="order-2">
                        <IconsUser aria-label="user-menu" class="text-white hover:text-red-primary transition duration-200" />
                    </Dropdown>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.underline-effect {
    position: relative;
}
.underline-effect::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    border-radius: 100px;
    background-color: #c70404;
    bottom: 0;
    left: 0;
    transform-origin: right;
    transform: scaleX(0);
    transition: transform .40s;
}
.underline-effect:hover::before {
    transform-origin: left;
    transform: scaleX(1);
}

</style>

<template>
    <div class="w-screen h-14">
        <div class="px-3 md:px-10 max-w-5xl xl:max-w-8xl mx-auto text-white h-full">
            <Separator class="!py-2 !pt-0" />
            <div class="justify-around gap-10 h-14 flex items-center -mt-2">
                <p class="text-sm md:text-base font-light underline-effect">
                    © 2024 Alex Croitoriu
                </p>
                <div class="flex items-center gap-3 md:gap-4">
                    <NuxtLink 
                        to="https://github.com/JellyGamez" 
                        target="_blank" 
                        class="text-white hover:text-gray-lightest transition duration-200"
                    >
                        <IconsGithub class="!size-6 md:!size-7" />
                    </NuxtLink>
                    <NuxtLink 
                        to="https://discord.com/users/273850522157580288" 
                        target="_blank" 
                        class="text-white hover:text-gray-lightest transition duration-200"
                    >
                        <IconsDiscord class="!size-6 md:!size-7" />
                    </NuxtLink>
                    <NuxtLink 
                        to="mailto:alexcroitoriu2005@gmail.com" 
                        target="_blank"
                        class="text-white hover:text-gray-lightest transition duration-200"
                    >
                        <IconsMail variant="solid" class="!size-6 md:!size-7" />
                    </NuxtLink>
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
    height: 1px;
    border-radius: 100px;
    background-color: #FFFFFF;
    bottom: 0;
    left: 0;
    transform-origin: right;
    transform: scaleX(0);
    transition: transform .4s;
}
.underline-effect:hover::before {
    transform-origin: left;
    transform: scaleX(1);
}

</style>

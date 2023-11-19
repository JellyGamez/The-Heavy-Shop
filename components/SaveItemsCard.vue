<template>
    <div class="flex flex-col items-center sm:flex-row gap-3 w-full bg-gray-dark rounded-xl p-4">
        <IconsUser class="w-10 h-10 shrink-0"/>
        <div class="text-sm text-center sm:text-left w-full flex flex-col"> 
            <slot />
        </div>
        <div class="gap-2 shrink-0 grid grid-cols-2">
            <NuxtLink to="/auth/login">
                <Button variant="secondary" class="w-full"> LOG IN </Button>
            </NuxtLink>
            <NuxtLink to="/auth/register">
                <Button class="w-full"> REGISTER </Button>
            </NuxtLink>
        </div>
    </div>
</template>
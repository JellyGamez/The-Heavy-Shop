<template>
    <div class="flex flex-col sm:flex-row items-center gap-y-2 gap-x-3 p-3 w-full rounded-2xl bg-gray-dark text-white">
        <IconsUser class="hidden sm:block !size-8 shrink-0" />
        <div class="text-sm text-center sm:text-left w-full flex flex-col"> 
            <slot />
        </div>
        <div class="gap-1 sm:gap-2 shrink-0 grid grid-cols-2">
            <NuxtLink to="/auth/login">
                <Button variant="secondary" size="small" class="w-full"> 
                    LOG IN 
                </Button>
            </NuxtLink>
            <NuxtLink to="/auth/register">
                <Button variant="primary" size="small" class="w-full"> 
                    REGISTER 
                </Button>
            </NuxtLink>
        </div>
    </div>
</template>

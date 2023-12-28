<template>
    <div class="flex flex-col items-center gap-3 p-4 w-full rounded-xl bg-gray-dark text-white">
        <div class="text-xl"> 
            <slot name="title" />
        </div>
        <div class="text-sm font-light max-w-xl text-center"> 
            <slot name="content" />
        </div>
        <NuxtLink to="/shop">
            <Button variant="secondary" class="w-40"> SHOP NOW </Button>
        </NuxtLink>
    </div>
</template>
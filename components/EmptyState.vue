<template>
    <div class="flex flex-col items-center gap-2 p-3 w-full rounded-2xl bg-gray-dark text-white">
        <div class="text-lg sm:text-xl"> 
            <slot name="title" />
        </div>
        <div class="text-sm font-light max-w-xl text-center"> 
            <slot name="content" />
        </div>
        <slot name="action" />
    </div>
</template>

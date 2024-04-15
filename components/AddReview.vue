<script setup>

const

</script>

<template>
    <div class="relative flex justify-between w-full p-3 md:p-4 rounded-2xl bg-gray-dark">
        <div class="flex w-full gap-6">
            <div class="flex flex-col text-white justify-between shrink-0">
                <div class="flex items-center gap-2">
                    <IconsUser class="hidden sm:block !w-8 !h-8 shrink-0" />
                    <p> {{ review.author.name }} </p>
                </div>
                <div class="flex items-center gap-1 ml-1.5">
                    <IconsCalendar/>
                    <p class="text-sm font-light font-ubuntu"> {{ review.createdAt }} </p>
                </div>
            </div>
            <div class="flex flex-col w-full justify-between overflow-hidden text-white">
                <div>
                    <p class="text-xl"> {{ review.title }} </p>
                    <div class="flex items-center my-1 md:my-2 gap-1.5">
                        <Rating :rating="review.rating"  />
                    </div>
                    <p class="font-light"> {{ review.content }} </p>
                </div>
            </div>
        </div>
    </div>
</template>
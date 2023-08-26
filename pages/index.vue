<script setup>

</script>

<template>
    <div class="bg-neutral-900 xl:h-screen pt-28 px-10 lg:px-20 grid grid-cols-1 xl:grid-cols-2 gap-8 mx-auto overflow-x-hidden">
        <div class="text-white text-5xl font-bold flex items-center justify-center">
            <div class="flex flex-col gap-8 text-center xl:text-left">
                <span>
                    We bring the <br />
                    <span class="text-6xl text-red-primary"> HEAVY STUFF. </span> <br />
                </span>

                <span>
                    You rock the <br />
                    <span class="text-6xl text-red-primary"> ATTITUDE. </span>
                </span>

                <span class="text-lg font-normal max-w-2xl">
                    Peruse through our Heavy Metal shop to discover a selection of t-shirts, accessories, and more
                    from your all-time favorite bands.
                    Embrace the genuine essence of rock and submerge yourself in the world of metal fashion.
                </span>

                <div>
                    <NuxtLink to="/shop">
                        <Button variant="secondary" size="large">
                            Shop now
                        </Button>
                    </NuxtLink>
                </div>
            </div>

        </div>

        <div class="overflow-auto">
            <img src="../components/Icons/MuscularMan.png" class="max-w-sm w-full xl:max-w-none xl:w-auto xl:h-full block mx-auto text-white"
                alt="Muscular man wearing our brand">
        </div>
    </div>
</template>
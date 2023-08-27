<script setup>

</script>

<template>
    <div class="bg-gray-primary xl:h-screen -mt-20 pt-28 px-4 md:px-10 lg:px-20 grid grid-cols-1 xl:grid-cols-2 gap-8 overflow-x-hidden">
        <div class="flex items-center justify-center text-white text-3xl md:text-5xl font-bold ">
            <div class="flex flex-col gap-8 mb-8 text-center xl:text-left">
                <span>
                    We bring the 
                    <br />

                    <span class="text-4xl md:text-6xl text-red-primary underline-effect"> 
                        HEAVY STUFF. 
                        <span class="underline"/>
                    </span> 

                    <br />
                </span>

                <span>
                    You rock the 
                    <br />

                    <span class="text-4xl md:text-6xl text-red-primary underline-effect"> 
                        ATTITUDE. 
                    </span>

                    <br />
                </span>

                <span class="text-base md:text-lg font-normal max-w-2xl">
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

        <div class="overflow-hidden xl:-mr-20">
            <img src="../components/Images/2.png" class="max-w-sm w-full xl:max-w-none xl:w-auto xl:h-full block mx-auto text-white"
                alt="Muscular man wearing our brand">
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
    height: 4px;
    border-radius: 4px;
    background-color: #c70404;
    bottom: 0;
    left: 0;
    transform-origin: right;
    transform: scaleX(0);
    transition: transform .3s ease-in-out;
  }

.underline-effect:hover::before {
  transform-origin: left;
  transform: scaleX(1);
}
</style>
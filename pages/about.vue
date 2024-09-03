<script setup>

useHead({
    title: 'About',
    meta: [
        { name: 'description', content: 'About' }
    ],
})

const features = [
    { 
        icon: 'earth',
        title: 'Free international shipping',
        description: 'Wherever you’re from, we’ve got you covered. No need to stress — we’ll take care of everything.'
    },
    {
        icon: 'undo',
        title: '30-day free refund policy',
        description: 'We value our customers, so if you’re not satisfied, getting your money back is quick and easy.'
    },
    {
        icon: 'keyhole',
        title: 'Secure online payment',
        description: 'You can shop with confidence, knowing that your information is protected every step of the way.'
    },
    {
        icon: '',
        title: 'Original and licensed products'
    }
]

</script>

<template>
    <div>
        <Banner 
            icon="document"
            title="About"
            description="Learn about our insights and ambition"
        />
        <div class="text-white font-light text-lg py-6 px-8 bg-gray-dark rounded-2xl mt-4 lg:mt-6 ">
            <NuxtLink to="/" class="flex flex-col items-center underline-effect smooth-scroll w-fit h-fit mx-auto self-center">
                <IconsLogo class="w-52 mx-auto text-red-primary" />
                <span class="text-red-primary transition duration-200 font-bold text-xl xl:text-2xl font-ubuntu whitespace-nowrap"> 
                    THE HEAVY SHOP
                </span>
            </NuxtLink>
            
        </div>
        <!-- <div class="mt-2 lg:mt-3 p-4  rounded-2xl flex flex-col items-center">
            <h1 class="text-3xl text-white"> What we offer </h1>
        </div> -->
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
    background-color: #C70404;
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

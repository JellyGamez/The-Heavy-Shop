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
            description="Learn about the development of the project"
        >
            <NuxtLink 
                to="https://github.com/JellyGamez/The-Heavy-Shop" 
                target="_blank"
            >
                <div class="flex items-center gap-1 rounded-2xl bg-gray-dark font-light text-white hover:text-gray-lightest transition duration-200 py-1.5 lg:py-2 px-2 lg:px-2.5">
                    <IconsGithub class="size-5 lg:size-6 mr-[3px] text-white" />
                    <span class="lg:text-lg"> Check out the repository </span>
                    <IconsDoubleChevronRight class="mt-0.5 mr-0.5 !size-3.5 lg:!size-4" />
                </div>
            </NuxtLink>
        </Banner>
        <div class="text-white font-light text-lg py-4 px-6 bg-gray-dark rounded-2xl mt-4 lg:mt-6">
            <h1 class="text-xl font-ubuntu">
                1. Motivation
            </h1>
        </div>
    </div>
</template>

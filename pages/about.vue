<script setup>

import { IconsNuxt, IconsPostgreSQL, IconsPrisma, IconsStripe, IconsTailwindCSS, IconsVercel } from '#components'

useHead({
    title: 'About',
    meta: [
        { name: 'description', content: 'Learn about the development of the project' }
    ],
})

const features = [
    {
        title: 'Authentication',
        subfeatures: [
            'Login and registration with credentials',
            'Login and registration with external providers (GitHub and Discord)',
            'Password reset through email'
        ]
    },
    {
        title: 'Items',
        subfeatures: [
            '2 display modes on the Shop page',
            'Search from anywhere in the application',
            'Sorting on the Shop, Favorites and Cart pages'
        ]
    },
    {
        title: 'Reviews',
        subfeatures: [
            'Sorting on the item page',
            'Logged in users can leave reviews for items',
            'Logged in users can edit or delete their reviews',
        ]
    },
    {
        title: 'UI & UX',
        subfeatures: [
            'Toast notifications for actions',
            'Fully responsive UI for all screen sizes',
            'Input validation and feedback on all fields'
        ]
    },
    {
        title: 'User account management',
        subfeatures: [
            'Update password',
            'Update or delete avatar',
            'Delete account'
        ]
    },
    {
        title: 'Misc',
        subfeatures: [
            'Secure payment integration',
            'Item count indicator for Favorites and Cart',
            'Favorites and Cart sync when authenticating'
        ]
    }
]

const techStack = [
    {
        icon: IconsNuxt,
        title: 'Nuxt',
        description: 'Full-stack framework',
        url: 'https://nuxt.com/'
    },
    {
        icon: IconsTailwindCSS,
        title: 'TailwindCSS',
        description: 'CSS framework',
        url: 'https://tailwindcss.com/'
    },
    {
        icon: IconsPrisma,
        title: 'Prisma',
        description: 'ORM',
        url: 'https://www.prisma.io/'
    },

    {
        icon: IconsPostgreSQL,
        title: 'PostgreSQL',
        description: 'Database',
        url: 'https://www.postgresql.org/'
    },
    {
        icon: IconsStripe,
        title: 'Stripe',
        description: 'Payment service',
        url: 'https://stripe.com/'
    },
    {
        icon: IconsVercel,
        title: 'Vercel',
        description: 'Hosting platform',
        url: 'https://vercel.com/'
    },
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
                    <IconsGitHub class="size-5 lg:size-6 mr-[3px] text-white" />
                    <div class="flex items-center gap-1">
                        <span class="lg:text-lg"> Check out the repository </span>
                        <IconsDoubleChevronRight class="mt-0.5 mr-0.5 !size-3.5 lg:!size-4" />
                    </div>
                </div>
            </NuxtLink>
        </Banner>
        <div class="flex flex-col gap-3 mt-4 lg:mt-6">
            <div class="text-white py-3 px-4 lg:py-5 lg:px-6 bg-gray-dark rounded-2xl">
                <h1 class="text-lg lg:text-xl flex items-center gap-1.5 lg:mb-1 justify-center lg:justify-start">
                    <IconsRouting class="text-red-light" />
                    <span> Project goals and motivation </span>
                </h1>
                <Separator class="!py-2 !px-0" />
                <div class="flex flex-col gap-4 font-light text-[15px] lg:text-base py-3 px-4 lg:-mb-1">
                    <p>
                        As a young programming enthusiast, primarily engaged in competitive programming, I wanted to expand my skill set beyong this domain. 
                        So I started diving into web development and experimented with a variety of popular frontend frameworks, including React, Svelte and Alpine.js. 
                    </p>
                    <p>
                        After trying them out, I found that Vue suited my style and preferences the best, ultimately becoming my framework of choice.
                        The next logical step into this progression was trying out Nuxt along with other modern technologies for developing my first application.
                    </p>
                    <p>
                        I also wanted to work on a project that was fun and connected to my personal interests, which led to the creation of 
                        <span class="font-medium"> THE HEAVY SHOP </span> — an online store concept specialized in heavy metal merchandise and apparel.
                        Being a huge metal music fan, this felt like the perfect blend of my technical skills and my love for the genre.
                    </p>
                    <p>
                        To make the project stand out, I decided to learn more about UI and UX design. 
                        I did some research and created an original design with a powerful color palette and a modern, minimalistic style, allowing me to integrate my technical and creative interests.
                    </p>
                </div>
            </div>
            <div class="text-white py-3 px-4 lg:py-5 lg:px-6 bg-gray-dark rounded-2xl">
                <h1 class="text-lg lg:text-xl flex items-center gap-1.5 lg:mb-1 justify-center lg:justify-start">
                    <IconsFeatures class="text-red-light" />
                    <span> Features </span>
                </h1>
                <Separator class="!py-2 !px-0" />
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-10 mx-auto w-fit relative mt-2 lg:mt-4 mb-1">
                    <div class="hidden md:block xl:hidden absolute left-1/2 -translate-x-1/2 h-full w-[1px] bg-gray-lighter" />
                    <div class="flex flex-col md:grid md:grid-rows-3 gap-6">
                        <div v-for="feature in features.slice(0, 3)" class="flex flex-col gap-1 text-center md:items-end md:justify-self-end md:text-right max-w-[350px]">
                            <p>
                                {{ feature.title }}
                            </p>
                            <ul>
                                <li v-for="subfeature in feature.subfeatures" class="font-light text-gray-lightest text-[15px]">
                                    {{ subfeature }}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <NuxtLink to="/" class="hidden xl:flex flex-col items-center underline-effect w-fit h-fit mx-auto self-center">
                        <NuxtImg
                            src="/img/avatar.webp" 
                            alt="logo"
                            class="size-36 xl:size-52 object-cover rounded-full" 
                            preload 
                        />
                        <span class="text-red-primary transition duration-200 font-bold text-xl xl:text-2xl font-ubuntu whitespace-nowrap -mt-3"> 
                            THE HEAVY SHOP
                        </span>
                    </NuxtLink>

                    <div class="flex flex-col md:grid md:grid-rows-3 gap-6">
                        <div v-for="feature in features.slice(3, 6)" class="flex flex-col gap-1 max-w-[350px] text-center md:text-left">
                            <p>
                                {{ feature.title }}
                            </p>
                            <ul>
                                <li v-for="subfeature in feature.subfeatures" class="font-light text-gray-lightest text-[15px]">
                                    {{ subfeature }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-white py-3 px-4 lg:py-5 lg:px-6 bg-gray-dark rounded-2xl">
                <h1 class="text-lg lg:text-xl flex items-center gap-1.5 lg:mb-1 justify-center lg:justify-start">
                    <IconsStack class="text-red-light" />
                    <span> Tech Stack </span>
                </h1>
                <Separator class="!py-2 !px-0" />
                <div class="font-light grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-5 mb-1 mt-3"> 
                    <div v-for="tech in techStack">
                        <NuxtLink :to="tech.url" target="_blank">
                            <Button class="h-full">
                                <div class="flex flex-col items-center w-full">
                                    <component :is="tech.icon" />
                                    <p class="lg:text-[17px] mt-1"> {{ tech.title }} </p>
                                    <p class="text-xs lg:text-sm text-gray-lightest font-light leading-tight"> {{ tech.description }}</p>
                                </div>
                            </Button>
                        </NuxtLink>
                    </div>
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
<template>
    <div>
        <Header />
        <!-- <Title>
            The Heavy Shop | {{ $route.name }}
        </Title> -->
        <div class="mt-20">
        <slot />
        </div>
        <Footer />
    </div>
</template>
<template>
    <div>
        <Header />
        <!-- <Title>
            The Heavy Shop | {{ $route.name }}
        </Title> -->
        <div class="pt-16 h-screen">
            <slot />
        </div>
        <Footer />
    </div>
</template>
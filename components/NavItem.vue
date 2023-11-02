<script setup>

const props = defineProps({
    url: String,
    action: String
})

const route = useRoute()
const router = useRouter()

function match(url) {
    return '/' + route.name?.replace('-', '/') == url || route.name == 'index' && url == '/'
}

</script>

<template>

    <button @click="() => { url ? router.push({ path: url }) : $emit('action', action) }">
        <p 
            :class="match(url) ? 'text-red-primary' : 'text-white'"
            class="hover:text-red-primary text-lg transition duration-200 text-left"
        >
            <slot />
        </p>
    </button>
</template>
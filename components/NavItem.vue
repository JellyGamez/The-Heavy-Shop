<script setup>

const props = defineProps({
    url: String,
    action: String
})

const emit = defineEmits(['action'])

const route = useRoute()
const router = useRouter()

function match(url) {
    return '/' + route.name?.replace('-', '/') == url || route.name == 'index' && url == '/'
}

function handleClick() {
    if (props.url)
        router.push({ path: props.url })
    else if (props.action)
        emit('action', props.action)
}

</script>

<template>
    <button @click="handleClick">
        <p 
            :class="match(url) ? 'text-red-primary' : 'text-white'"
            class="hover:text-red-primary text-lg transition duration-200 text-left"
        >
            <slot />
        </p>
    </button>
</template>

<script setup>

import { IconsBookmark, IconsHome, IconsShoppingBag, IconsShoppingCart, IconsDocument, IconsGallery } from '#components'

const props = defineProps({
    action: String,
    label: String,
    icon: String,
    url: String
})

const emit = defineEmits(['action'])

const route = useRoute()
const router = useRouter()

function match(url) {
    return '/' + route.name?.replace('-', '/') === url || route.name === 'index' && url === '/'
}

function handleClick() {
    if (props.url)
        router.push({ path: props.url })
    else if (props.action)
        emit('action', props.action)
}

const icon = computed(() => {
    return {
        'Home'         : IconsHome,        
        'Gallery'      : IconsGallery,   
        'Document'     : IconsDocument,
        'Bookmark'     : IconsBookmark,    
        'ShoppingBag'  : IconsShoppingBag, 
        'ShoppingCart' : IconsShoppingCart
    }[props.icon]
})

</script>

<template>
    <button @click="handleClick">
        <div 
            :class="[
                match(url) ? 'text-red-primary' : 'text-white',
                'flex items-center space-x-2 text-lg text-left hover:text-red-primary transition duration-200'
            ]"
        >
            <component v-if="icon" :is="icon" />
            <span v-if="label"> {{ label }} </span>
        </div>
    </button>
</template>

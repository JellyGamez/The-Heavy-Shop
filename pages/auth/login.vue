<script setup>

import { useToast } from 'vue-toastification'

useHead({
    title: 'Login',
    meta: [
        { name: 'description', content: 'Login' }
    ],
})

definePageMeta({
    layout: 'auth',
    middleware: 'auth',
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/',
    },
})

const toast = useToast()

const { signIn } = useAuth()
const { syncItems: syncCart } = useCart()
const { syncItems: syncFavorites } = useFavorites()

const email = ref('')
const password = ref('')
const errorMessage = ref()
const loading = ref(false)

async function credentialsSignIn() {
    loading.value = true
    errorMessage.value = null
    const { error } = await signIn('credentials', {
        email: email.value,
        password: password.value,
        redirect: false
    })
    errorMessage.value = error
    if (!error) {
        await navigateTo('/')
        const cart = await syncCart()
        const favorites = await syncFavorites()
        if (cart || favorites)
            toast.success('Your items have been synced!')
    }
    loading.value = false
}

</script>

<template>
    <AuthCard title="Welcome back!">
        <form @submit.prevent="credentialsSignIn">
            <div class="flex flex-col gap-4">
                <div>
                    <Label for="email"> Email </Label>
                    <TextInput 
                        v-model="email" 
                        name="email" 
                        id="email" 
                        type="email" 
                        autocomplete="email"
                    >
                        <IconsMail class="text-white" />
                    </TextInput>
                </div>
                <div>
                    <Label for="password"> Password </Label>
                    <TextInput 
                        v-model="password" 
                        name="password" 
                        id="password" 
                        type="password"
                    >
                        <IconsKey class="text-white" />
                    </TextInput>
                    <Label>
                        <NuxtLink to="/auth/forgot-password" class="hover:underline">
                            Forgot your password?
                        </NuxtLink>
                    </Label>
                </div>
                <Error class="text-center"> {{ errorMessage }} </Error>
                <Button 
                    type="submit" 
                    :variant="loading ? 'loading' : 'primary'"
                >
                    LOG IN
                </Button>
            </div>
        </form>
        <div class="mt-6 flex flex-col items-center">
            <p class="text-white text-sm font-extralight my-1"> 
                Or log in using 
            </p>
            <div class="flex gap-3">
                <button 
                    @click="async () => await signIn('github')" 
                    aria-label="github"
                    class="text-white hover:text-gray-lighter transition duration-200"
                >
                    <IconsGithub />
                </button>
                <button 
                    @click="async () => await signIn('discord')" 
                    aria-label="discord"
                    class="text-white hover:text-gray-lighter transition duration-200"
                >
                    <IconsDiscord />
                </button>
            </div>
        </div>
        <Label class="mt-6 !ml-0 flex flex-wrap items-center justify-center gap-1">
            <span> Don't have an account yet? </span>
            <NuxtLink to="/auth/register" class="font-normal text-red-primary hover:underline">
                Register
            </NuxtLink>
        </Label>
    </AuthCard>
</template>

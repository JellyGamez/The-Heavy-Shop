<script setup>

import { useToast } from 'vue-toastification'

const toast = useToast()

useHead({
    title: 'Register',
    meta: [
        { name: 'description', content: 'Register' }
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

const { signIn } = useAuth()
const { syncItems: syncCart } = useCart()
const { syncItems: syncFavorites } = useFavorites()

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')

const errorMessage = ref()
const loading = ref(false)

async function register() {
    loading.value = true
    errorMessage.value = null
    const { error } = await useFetch('/api/auth/register', {
        method: 'POST',
        body: {
            name: name.value,
            email: email.value,
            password: password.value,
            passwordConfirmation: passwordConfirmation.value
        }
    })
    errorMessage.value = error.value?.data.statusMessage
    if (!error.value) {
        await signIn('credentials', {
            email: email.value,
            password: password.value,
            redirect: false
        })

        await navigateTo('/')
        toast.success("Account created successfully!")
        
        await syncCart()
        await syncFavorites()
    }
    loading.value = false
}

</script>

<template>
    <AuthCard title="Create a new account">
        <form @submit.prevent="register">
            <div class="flex flex-col gap-4">
                <div>
                    <Label for="name"> Name </Label>
                    <TextInput v-model="name" name="name" id="name" type="text" autocomplete="name">
                        <IconsUser class="!size-5 text-white" />
                    </TextInput>
                </div>
                <div>
                    <Label for="email"> Email </Label>
                    <TextInput v-model="email" name="email" id="email" type="email" autocomplete="email">
                        <IconsMail />
                    </TextInput>
                </div>
                <div>
                    <Label for="password"> Password </Label>
                    <TextInput v-model="password" name="password" id="password" type="password">
                        <IconsKey />
                    </TextInput>
                </div>
                <div>
                    <Label for="password-confirmation"> Password confirmation </Label>
                    <TextInput v-model="passwordConfirmation" name="password-confirmation" id="password-confirmation" type="password">
                        <IconsKey />
                    </TextInput>
                </div>
                <Error class="text-center">
                    {{ errorMessage }}
                </Error>
                <Button type="submit" :variant="loading ? 'loading' : 'primary'">
                    REGISTER
                </Button>
            </div>
        </form>
        <div class="text-white text-sm font-extralight my-1"></div>
        <Label class="mt-8 !ml-0 flex flex-wrap items-center justify-center gap-1">
            <span> Already have an account? </span>
            <NuxtLink to="/auth/login" class="font-normal text-red-primary hover:underline">
                Log in
            </NuxtLink>
        </Label>
    </AuthCard>
</template>

<script setup>

useHead({
    title: 'Register',
    meta: [
        { name: 'description', content: 'Register' }
    ],
})

definePageMeta({
    middleware: 'auth',
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/',
    },
})

const { signIn } = useAuth()

const username = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')

const errorMessage = ref()

async function credentialsSignIn() {
    errorMessage.value = null;
    const { url, error } = await signIn('credentials', { email: email.value, password: password.value, redirect: false })
    errorMessage.value = error
    
    if (!error)
        navigateTo(url, { external: true })
}

async function register() {
    errorMessage.value = null;
    const { error, data } = await useFetch('/api/register', {
        method: 'POST',
        body: {
            username: username.value,
            email: email.value,
            password: password.value,
            passwordConfirmation: passwordConfirmation.value
        },
        key: `${username.value} ${email.value} ${password.value}  ${passwordConfirmation.value}`
    })
    errorMessage.value = error.value?.statusMessage
    if (!error.value)
        credentialsSignIn()
    console.log(data.value?.message)
}

</script>

<template>
    <div class="bg-gray-light min-h-full flex flex-col items-center justify-center">
        <AuthCard title="Create a new account">
            <form @submit.prevent="register()">
                <div class="flex flex-col gap-4">
					<div>
                        <Label class="ml-2" for="username"> Username </Label>
                        <TextInput v-model="username" name="username" id="username" type="text">
                            <IconsUser class="w-5 h-5" />
                        </TextInput>
                    </div>
                    <div>
                        <Label class="ml-2" for="email"> Email </Label>
                        <TextInput v-model="email" name="email" id="email" type="email">
                            <IconsEnvelope class="w-5 h-5" />
                        </TextInput>
                    </div>
                    <div>
                        <Label class="ml-2" for="password"> Password </Label>
                        <TextInput v-model="password" name="password" id="password" type="password">
                            <IconsLock class="w-5 h-5" />
                        </TextInput>
                    </div>
					<div>
                        <Label class="ml-2" for="password-confirmation"> Password confirmation </Label>
                        <TextInput v-model="passwordConfirmation" name="password-confirmation" id="password-confirmation" type="password">
                            <IconsLock class="w-5 h-5" />
                        </TextInput>
                    </div>
                    <Error class="text-center">
                        {{ errorMessage }}
                    </Error>
                    <Button type="submit" size="small">
                        REGISTER
                    </Button>
                </div>
            </form>
            <Label class="mt-8 flex flex-wrap items-center gap-1 justify-center">
                Already have an account?
                <NuxtLink to="/auth/login" class="font-medium text-red-primary hover:underline">
                    Log in
                </NuxtLink>
            </Label>
        </AuthCard>
    </div>
</template>
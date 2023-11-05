<script setup>

useHead({
    title: 'Reset password',
    meta: [
        { name: 'description', content: 'Reset password' }
    ],
})

definePageMeta({
    middleware: 'auth',
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/',
    },
})

const route = useRoute()

const password = ref('')
const passwordConfirmation = ref('')

const errorMessage = ref()

async function credentialsSignIn() {
    const { url, error } = await signIn('credentials', { email: email.value, password: password.value, redirect: false })
    errorMessage.value = error
    if (!error)
        navigateTo(url, { external: true })
}

async function resetPassword()
{
    const { error, data } = await useFetch('/api/reset-password', {
        method: 'POST',
        body: {
            signedToken: route.query.token,
            password: password.value,
            passwordConfirmation: passwordConfirmation.value
        },
        key: `${password.value}  ${passwordConfirmation.value}`
    })
    errorMessage.value = error.value?.statusMessage
    
    if (!error.value)
    {
        //toast notification
        navigateTo('/auth/login', { external: true })
    }
    console.log(data.value)
}

</script>

<template>
    <div class="bg-gray-light min-h-full flex flex-col items-center justify-center">
        <AuthCard title="Reset password" description="Enter a new secure password for your account">
            <form @submit.prevent="resetPassword">
                <div class="flex flex-col gap-4">
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
                        RESET PASSWORD
                    </Button>
                </div>
            </form>
        </AuthCard>
    </div>
</template>
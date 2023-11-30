<script setup>

import toast from '@/composables/useToast'

useHead({
    title: 'Reset password',
    meta: [
        { name: 'description', content: 'Reset password' }
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

const route = useRoute()

const password = ref('')
const passwordConfirmation = ref('')

const errorMessage = ref()

async function resetPassword() {
    errorMessage.value = null
    const { error, data } = await useFetch('/api/auth/reset-password', {
        method: 'POST',
        key: `${password.value}  ${passwordConfirmation.value}`,
        body: {
            signedToken: route.query.token,
            password: password.value,
            passwordConfirmation: passwordConfirmation.value
        }
    })
    errorMessage.value = error.value?.statusMessage
    if (!error.value)
    {
        await navigateTo('/auth/login')
        toast("Password reset successfully!")
    }
    console.log(data.value)
}

</script>

<template>
    <AuthCard title="Reset password" description="Enter a new secure password for your account">
        <form @submit.prevent="resetPassword">
            <div class="flex flex-col gap-4">
                <div>
                    <Label class="ml-2" for="password"> Password </Label>
                    <TextInput v-model="password" name="password" id="password" type="password">
                        <IconsKey />
                    </TextInput>
                </div>
                <div>
                    <Label class="ml-2" for="password-confirmation"> Password confirmation </Label>
                    <TextInput v-model="passwordConfirmation" name="password-confirmation" id="password-confirmation" type="password">
                        <IconsKey />
                    </TextInput>
                </div>
                <Error class="text-center">
                    {{ errorMessage }}
                </Error>
                <Button type="submit">
                    RESET PASSWORD
                </Button>
            </div>
        </form>
    </AuthCard>
</template>

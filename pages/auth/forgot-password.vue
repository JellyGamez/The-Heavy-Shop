<script setup>

import toast from '@/composables/useToast'

useHead({
    title: 'Forgot password',
    meta: [
        { name: 'description', content: 'Forgot password' }
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

const email = ref('')

const errorMessage = ref()

async function sendEmail() {
    errorMessage.value = null
    const { error } = await useFetch('/api/auth/forgot-password', {
        method: 'POST',
        body: {
            email: email.value,
        },
    })
    errorMessage.value = error.value?.data.statusMessage
    if (!error.value)
        toast("Email sent successfully!")
}

</script>

<template>
    <AuthCard 
        title="Forgot password" 
        description="Enter the email address associated with your account and we'll send you a link to reset your password"
    >
        <form @submit.prevent="sendEmail">
            <div class="flex flex-col gap-4">
                <div> 
                    <Label for="email"> Email </Label>
                    <TextInput v-model="email" name="email" id="email" type="email" autocomplete="email">
                        <IconsMail />
                    </TextInput>
                </div>
                <Error class="text-center">
                    {{ errorMessage }}
                </Error>
                <Button type="submit">
                    SEND PASSWORD RESET EMAIL
                </Button>
            </div>
        </form>
    </AuthCard>
</template>

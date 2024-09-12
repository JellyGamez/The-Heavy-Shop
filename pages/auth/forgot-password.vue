<script setup>

import { useToast } from 'vue-toastification'

useHead({
    title: 'Forgot password'
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

const email = ref('')
const errorMessage = ref()
const loading = ref(false)

async function sendEmail() {
    loading.value = true
    errorMessage.value = null
    const { error } = await useFetch('/api/auth/forgot-password', {
        method: 'POST',
        body: {
            email: email.value,
        },
    })
    errorMessage.value = error.value?.data.statusMessage
    if (!error.value)
        toast.success("Email sent successfully!")
    loading.value = false
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
                <Error> {{ errorMessage }} </Error>
                <Button 
                    type="submit" 
                    :variant="loading ? 'loading' : 'primary'"
                >
                    SEND PASSWORD RESET EMAIL
                </Button>
            </div>
        </form>
    </AuthCard>
</template>

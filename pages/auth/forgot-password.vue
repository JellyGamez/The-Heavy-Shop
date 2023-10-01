<script setup>

useHead({
    title: 'Forgot password',
    meta: [
        { name: 'description', content: 'Forgot password' }
    ],
})

definePageMeta({
    middleware: 'auth',
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/',
    },
})

function sendEmail()
{

}
</script>

<template>
    <div class="bg-gray-light min-h-full flex flex-col items-center justify-center">
        <AuthCard label="Reset password" description="Enter the email address associated with your account and we'll send you a link to reset your password">
            <form @submit.prevent="sendEmail" autocomplete="on">
                <div class="flex flex-col gap-4">
                    <div> 
                        <Label class="ml-2" for="email"> Email </Label>
                        <TextInput v-model="email" name="email" id="email" type="email">
                            <IconsEnvelope class="w-5 h-5" />
                        </TextInput>
                    </div>
                    <Error class="text-center">
                        {{ errorMessage }}
                    </Error>
                    <Button type="submit" size="small" name="login">
                        SEND PASSWORD RESET EMAIL
                    </Button>
                </div>
            </form>

            <div class="mt-8 flex justify-center items-center space-x-10">
                <NuxtLink to="/auth/login" class="font-normal text-red-primary hover:underline text-sm">
                    Return to login page
                </NuxtLink>
            </div>
        </AuthCard>
    </div>
</template>
<script setup>

useHead({
    title: 'Forgot password',
    meta: [
        { name: 'description', content: 'Forgot password' }
    ],
})

function sendEmail()
{

}
</script>

<template>
    <div class="bg-gray-light min-h-full flex flex-col items-center justify-center">
        <AuthCard label="Reset password">
            <form @submit.prevent="sendEmail()" autocomplete="on">
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

            <div class="mt-8 flex justify-center items-center">
                <NuxtLink to="/auth/login" class="font-normal text-red-primary hover:underline">
                    Log in
                </NuxtLink>
                <div class="mx-2 w-1 h-1 rounded-full bg-gray-light" />
                <NuxtLink to="/auth/register" class="font-normal text-red-primary hover:underline">
                    Register
                </NuxtLink>
            </div>
        </AuthCard>
    </div>
</template>
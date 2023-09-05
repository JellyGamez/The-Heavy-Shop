<script setup>

const { signIn } = useAuth()

definePageMeta({
    middleware: 'auth',
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/',
    },
})

const email = ref('')
const password = ref('')

const errorMessage = ref('')

async function githubSignIn() {
    await signIn('github')
}
async function discordSignIn() {
    await signIn('discord')
}
async function credentialsSignIn() {
    const { url, error } = await signIn('credentials', { email: email.value, password: password.value, redirect: false })
    errorMessage.value = error
    if (!error)
        navigateTo(url, {external: true})
}

</script>

<template>
    <div class="bg-gray-light h-full flex flex-col items-center justify-center">
        <AuthCard label="Welcome back!">
            <form @submit.prevent="credentialsSignIn()" autocomplete="">
                <div class="flex flex-col gap-4">
                    <div>
                        <Label> Email </Label>
                        <TextInput v-model="email" name="email" type="email">
                            <IconsEnvelope class="w-5 h-5" />
                        </TextInput>
                    </div>
                    <div>
                        <Label> Password </Label>
                        <TextInput v-model="password" name="password" type="password">
                            <IconsLock class="w-5 h-5" />
                        </TextInput>
                        <Label class="mt-1">
                            <NuxtLink to="/auth/forgot-password" class="hover:underline">
                                Forgot your password?
                            </NuxtLink>
                        </Label>
                    </div>
                    <Error class="text-center">
                        {{ errorMessage }}
                    </Error>
                    <Button type="submit" size="small">
                        LOGIN
                    </Button>
                </div>
            </form>
            <div class="mt-8 flex flex-col items-center">
                <Label> Or login using </Label>
                <div class="flex gap-3">
                    <button class="text-white hover:text-gray-hover transition duration-200" @click="githubSignIn()" type="button">
                        <IconsGithub />
                    </button>
                    <button class="text-white hover:text-gray-hover transition duration-200" @click="discordSignIn()" type="button">
                        <IconsDiscord />
                    </button>
                </div>
            </div>
            <Label class="mt-8 flex flex-wrap items-center gap-1 justify-center">
                Don't have an account yet? 
                <NuxtLink to="/auth/register" class="font-normal text-red-primary hover:underline">
                    Register
                </NuxtLink>
            </Label>
        </AuthCard>
    </div>
</template>
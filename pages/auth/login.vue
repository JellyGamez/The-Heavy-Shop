<script setup>

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

const { signIn } = useAuth()

const email = ref('')
const password = ref('')

const errorMessage = ref()

async function githubSignIn() {
    await signIn('github')
}
async function discordSignIn() {
    await signIn('discord')
}
async function credentialsSignIn() {
    errorMessage.value = null
    const { url, error } = await signIn('credentials', {
        email: email.value,
        password: password.value,
        redirect: false
    })
    errorMessage.value = error
    if (!error)
        await navigateTo(url, {external: true})
}

</script>

<template>
    <AuthCard title="Welcome back!">
        <form @submit.prevent="credentialsSignIn()">
            <div class="flex flex-col gap-4">
                <div>
                    <Label class="ml-2" for="email"> Email </Label>
                    <TextInput v-model="email" name="email" id="email" type="email">
                        <IconsEnvelope />
                    </TextInput>
                </div>
                <div>
                    <Label class="ml-2" for="password"> Password </Label>
                    <TextInput v-model="password" name="password" id="password" type="password">
                        <IconsLock />
                    </TextInput>
                    <Label class="ml-2">
                        <NuxtLink to="/auth/forgot-password" class="hover:underline">
                            Forgot your password?
                        </NuxtLink>
                    </Label>
                </div>
                <Error class="text-center">
                    {{ errorMessage }}
                </Error>
                <Button type="submit" name="login">
                    LOG IN
                </Button>
            </div>
        </form>
        <div class="mt-6 flex flex-col items-center">
            <Label> Or log in using </Label>
            <div class="flex gap-3">
                <button class="text-white hover:text-gray-hover transition duration-200" @click="githubSignIn()" type="button" aria-label="github">
                    <IconsGithub />
                </button>
                <button class="text-white hover:text-gray-hover transition duration-200" @click="discordSignIn()" type="button" aria-label="discord">
                    <IconsDiscord />
                </button>
            </div>
        </div>
        <Label class="mt-6 flex flex-wrap items-center gap-1 justify-center">
            Don't have an account yet? 
            <NuxtLink to="/auth/register" class="font-medium text-red-primary hover:underline">
                Register
            </NuxtLink>
        </Label>
    </AuthCard>
</template>

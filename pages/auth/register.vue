<script setup>

const { signIn } = useAuth()

definePageMeta({
    middleware: 'auth',
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/',
    },
})

const username = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')

const errorMessage = ref('')

async function credentialsSignIn() {
    const { url, error } = await signIn('credentials', { email: email.value, password: password.value, redirect: false })
    errorMessage.value = error
    if (!error)
        navigateTo(url, { external: true })
}
function register() {

}

</script>

<template>
    <div class="bg-gray-light h-full flex flex-col items-center justify-center">
        <AuthCard label="Create a new account">
            <form @submit.prevent="register()" autocomplete="">
                <div class="flex flex-col gap-4">
					<div>
                        <Label> Username </Label>
                        <TextInput v-model="username" name="username" type="text">
                            <IconsUser class="w-5 h-5" />
                        </TextInput>
                    </div>
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
                    </div>
					<div>
                        <Label> Password confirmation </Label>
                        <TextInput v-model="passwordConfirmation" name="passwordConfirmation" type="password">
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
            <!-- <div class="mt-8 flex flex-col items-center">
                <Label> Or login using </Label>
                <div class="flex gap-3">
                    <button class="text-white hover:text-gray-hover transition duration-200" @click="githubSignIn()" type="button">
                        <IconsGithub />
                    </button>
                    <button class="text-white hover:text-gray-hover transition duration-200" @click="discordSignIn()" type="button">
                        <IconsDiscord />
                    </button>
                </div>
            </div> -->
            <Label class="mt-8 flex flex-wrap items-center gap-1 justify-center">
                Already have an account?
                <NuxtLink to="/auth/login" class="font-normal text-red-primary hover:underline">
                    Login
                </NuxtLink>
            </Label>
        </AuthCard>
    </div>
</template>
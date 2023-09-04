<script setup>

const { status, signIn } = useAuth()

definePageMeta({
    middleware: 'auth',
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/',
    },
})

const email = ref('')
const password = ref('')
const error = ref('')

async function githubSignIn() {
    await signIn('github')
}
async function credentialsSignIn() {
    try {
        await signIn('credentials', { email: email.value, password: password.value })
    } catch (e) {
        error.value = e
        console.log(e)
    }
}

</script>

<template>
    <div class="bg-gray-light h-full flex flex-col items-center justify-center">
        <AuthCard label="Welcome back!">
            <Button @click="githubSignIn()" size="small">
                Sign in with github
            </Button>
            <form @submit.prevent="credentialsSignIn()">
                <div class="flex flex-col gap-4">
                    <div>
                        <InputLabel> Email </InputLabel>
                        <TextInput v-model="email" name="email" type="email">
                            <IconsEnvelope />
                        </TextInput>
                    </div>
                    <div>
                        <InputLabel> Password </InputLabel>
                        <TextInput v-model="password" name="password" type="password">
                            <IconsLock />
                        </TextInput>
                    </div>
                    <Error>
                        {{ error }}
                    </Error>
                    <Button type="submit" size="small">
                        LOGIN
                    </Button>
                </div>
            </form>
        </AuthCard>
    </div>
</template>
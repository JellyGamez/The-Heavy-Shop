
<script setup>

const { status, signIn } = useAuth()

definePageMeta({
  middleware: 'auth',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
})

async function githubSignIn()
{
    await signIn('github')
}
async function credentialsSignIn()
{
    await signIn('credentials')
}

const email = ref('');
const password = ref('');

</script>

<template>

    {{ status }}
    <Button @click="githubSignIn()">
        Sign in with github
    </Button>
    <form @submit.prevent="credentialsSignIn()">
        <div class="flex flex-col">
            <label for="email"> Email </label>
            <input v-model="email" name="email" class="border border-red-primary"/>


            <label for="password"> Password </label>
            <input v-model="password" name="password"/>
            <Button type="submit">
                Sign in with credentials
            </Button>


        </div>

    </form>


</template>
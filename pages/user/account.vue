<script setup>

useHead({
    title: 'Account',
    meta: [
        { name: 'description', content: 'Account' }
    ],
})

definePageMeta({
    middleware: 'auth',
})

const { signOut } = useAuth()

const { data: user } = await useFetch('/api/user')

const bus = useEventBus('modal')

async function deleteAccount() {
    await useFetch('/api/user', {
        method: 'DELETE'
    })

    signOut()
}

</script>

<template>
    <div>
        <ConfirmationModal
            title="Are you sure you want to delete your account?"
            description="This action is irreversible."
            @confirm="deleteAccount"
        />
        <div class="sm:ml-1 flex flex-col items-center sm:items-start text-white">
            <div class="flex items-center gap-1.5 lg:gap-2">
                <IconsUser class="size-6 lg:size-7" />
                <h1 class="text-2xl lg:text-3xl">
                    Account
                </h1>
            </div>
            <p class="text-sm lg:text-base text-center">
                Manage your user settings and data
            </p>
        </div>
        <div class="mt-4 lg:mt-6 flex p-4 rounded-2xl bg-gray-dark">
            <div class="flex flex-col items-center w-full">
                <div class="shrink-0">
                    <NuxtImg 
                        :src="user.photoUrl ?? '/img/avatar.webp'" 
                        alt="avatar"
                        class="size-36 md:size-52 object-cover rounded-full" 
                        preload 
                    />
                </div>
                <div class="mt-4 flex flex-col gap-2 items-center w-full text-white">
                    <p class="text-2xl md:text-3xl"> 
                        {{ user.name }}
                    </p>

                    <div class="flex flex-col items-center">
                        <p class="flex items-center gap-1 text-gray-lightest">
                            <IconsMail class="!size-4 md:!size-5 text-gray-lightest" /> 
                            <span class="text-sm md:text-base"> Email </span>
                        </p>
                        <p class="text-base md:text-lg">
                            {{ user.email }}
                        </p>
                    </div>

                    <div>
                        <p class="flex items-center gap-1 text-gray-lightest">
                            <IconsClock class="!size-4 md:!size-5 text-gray-lightest" /> 
                            <span class="text-sm md:text-base"> Registered on </span>
                        </p>
                        <p class="text-base md:text-lg">
                            {{ user.registeredOn }}
                        </p>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                    <Button 
                        size="medium"
                        @click="signOut"
                    >
                        <IconsLogout class="!size-5" />
                        <span> LOG OUT </span>
                    </Button>
                    <Button 
                        variant="secondary" 
                        size="medium"
                    >
                        <IconsKey class="!size-5" />
                        <span> UPDATE PASSWORD </span>
                    </Button>
                    <Button 
                        size="medium"
                        @click="bus.emit('confirmation')"
                    >
                        <IconsTrashBin class="!size-5" />
                        <span> DELETE ACCOUNT </span>
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>

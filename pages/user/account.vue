<script setup>

import { useToast } from 'vue-toastification';

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

const user = ref((await useFetch('/api/user')).data.value)

const toast = useToast()
const bus = useEventBus('modal')
const updateAvatar = ref()
const loading = ref(false)

async function deleteAccount() {
    await useFetch('/api/user', {
        method: 'DELETE'
    })
    signOut()
}

async function updateAccount(body) {
    await useFetch('/api/user', {
        method: 'PUT',
        body: body
    })
    user.value = (await useFetch('/api/user')).data.value
}

const uploadFile = useDebounceFn(async () => {
    if (updateAvatar.value.files.length) {
        const formData = new FormData()
        Array.from(updateAvatar.value.files).forEach((file, index) => {
            formData.append(index, file)
        })

        loading.value = true
    
        const { data, error } = await useFetch('/api/upload-file', {
            method: 'POST',
            body: formData
        })
        
        if (error.value) {
            toast.error(error.value.statusMessage)
            loading.value = false
        }
        else {
            await updateAccount({
                photoUrl: data.value.path
            })
            updateAvatar.value.files = null
        }
    }
})

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
                <div class="group shrink-0 relative flex rounded-full">
                    <NuxtImg
                        :src="user.photoUrl ?? '/img/avatar.webp'" 
                        alt="avatar"
                        :class="[
                            loading ? 'opacity-25' : 'opacity-100',
                            'size-36 md:size-52 object-cover rounded-full transition duration-200'
                        ]" 
                        @load="() => { 
                            if (loading) {
                                loading = false 
                                if (user.photoUrl)
                                    toast.success('Avatar updated successfully!')
                            }
                        }"
                        preload 
                    />
                    <Button 
                        :class="[
                            user.photoUrl ? 'bottom-1 left-2.5 md:bottom-2 md:left-3' : '-bottom-4 left-1/2 -translate-x-1/2',
                            'absolute !rounded-full !w-fit !p-0 cursor-pointer transition-all duration-300'
                        ]"
                    >
                        <label for="update-avatar" class="!p-2 md:!p-2.5 cursor-pointer"> 
                            <IconsPencil />
                            <input
                                id="update-avatar"
                                ref="updateAvatar"
                                type="file" 
                                accept="image/*"
                                @change="uploadFile"
                                aria-label="update-avatar"
                                class="hidden"
                            >
                        </label>
                    </Button>
                    <Button 
                        v-if="user.photoUrl"
                        @click="updateAccount({
                            photoUrl: null
                        }).then(() => toast.success('Avatar deleted successfully!'))"
                        class="bottom-1 right-2.5 md:bottom-2 md:right-3 absolute !rounded-full !w-fit !p-2 md:!p-2.5"
                    >
                        <IconsTrashBin class="!size-4" />
                    </Button>
                    <div 
                        v-if="loading"
                        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                        <IconsSpinner class="animate-spin text-white !size-8 md:!size-11" />
                    </div>
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
                <div class="grid grid-cols-1 w-full max-w-72 md:w-auto md:max-w-none md:grid-cols-3 gap-3 mt-4">
                    <Button 
                        size="medium"
                        @click="signOut"
                    >
                        <IconsLogout class="!size-5" />
                        <span> LOG OUT </span>
                    </Button>
                    <NuxtLink to="/user/update-password">
                        <Button 
                            variant="secondary" 
                            size="medium"
                        >
                            <IconsKey class="!size-5" />
                            <span> UPDATE PASSWORD </span>
                        </Button>
                    </NuxtLink>
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

<script setup>

const props = defineProps({
    url: String
});

</script>

<template>
    <e-html lang="en">
        <e-text>
            Hello,
            <br>
            You are receiving this email in response to your request to reset your password.
            <br>
            Please follow the link below:
        </e-text>
        <e-button :href="url" style="background-color: #262626; color: white; text-decoration: none; border-radius: 12px" px="8" py="4">
            Reset Password
        </e-button>
        <e-text>
            If you did not request a password change, please ignore this email.
        </e-text>
    </e-html>
</template>
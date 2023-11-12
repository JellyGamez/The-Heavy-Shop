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
            <br>
            You are receiving this email in response to your request to reset your password.
            <br>
            Please follow this link:
            <e-link :href="url">
                Reset Password
            </e-link>
        </e-text>

        <e-text>
            If you did not request a password change, you can ignore this email.
        </e-text>
    </e-html>
</template>

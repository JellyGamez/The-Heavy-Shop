<script setup>

const props = defineProps({
    url: String
})

</script>

<template>
    <EHtml lang="en">
        <EText>
            Hello,
            <br>
            <br>
            You are receiving this email in response to your request to reset your password.
            <br>
            Please follow this link:
            <ELink :href="url">
                Reset Password
            </ELink>
        </EText>

        <EText>
            If you did not request a password change, you can ignore this email.
        </EText>
    </EHtml>
</template>

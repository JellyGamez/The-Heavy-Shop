<script setup>

const props = defineProps({
    url: String
})

</script>

<template>
    <EHtml lang="en">
        <EText>
            You are receiving this email in response to your request to reset your password. If you did not initiate this request, please ignore this message.
            <br>
            Please follow this link:
            <ELink :href="url">
                Reset Password
            </ELink>
        </EText>
    </EHtml>
</template>
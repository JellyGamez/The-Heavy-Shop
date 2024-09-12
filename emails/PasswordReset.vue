<script setup>

const props = defineProps({
    url: String
})

import { Text, Html, Link } from '@vue-email/components'

</script>

<template>
    <Html lang="en">
        <Text>
            You are receiving this email in response to your request to reset your password.
            <br>
            Please follow this link:
            <Link :href="url">
                Reset Password
            </Link>
        </Text>
    </Html>
</template>

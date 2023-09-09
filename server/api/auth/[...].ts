import GithubProvider from 'next-auth/providers/github'
import DiscordProvider from 'next-auth/providers/discord'
import CredentialsProvider from 'next-auth/providers/credentials'

import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        GithubProvider.default({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        DiscordProvider.default({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET
        }),
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        CredentialsProvider.default({
            name: 'Credentials',
            authorize(credentials: any) {
                $fetch('api/prisma/get-user')
                const user = {
                    email: 'admin@test.com',
                    password: 'password'
                }
                if (credentials?.email === user.email && credentials?.password === user.password) {
                    return user
                } else {
                    if (!credentials?.email)
                        throw createError({
                            statusCode: 400, 
                            statusMessage: 'The email field is required.'
                        })
                    else if (!credentials?.password) 
                        throw createError({
                            statusCode: 400, 
                            statusMessage: 'The password field is required.'
                        })
                    else 
                        throw createError({
                            statusCode: 400, 
                            statusMessage: 'Invalid credentials. Please try again.'
                        })
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/login'
    }
})
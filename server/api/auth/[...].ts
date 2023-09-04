import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        GithubProvider.default({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        CredentialsProvider.default({
            name: 'Credentials',
            authorize(credentials: any) {
                const user = {
                    email: 'admin@test.com',
                    password: 'password'
                }
                if (credentials?.email === user.email && credentials?.password === user.password) {
                    return user
                } else {
                    throw ({
                        statusCode: 403,
                        statusMessage: "Wrong credentials!"
                    })
                }

            }
        })
    ],
    pages: {
        signIn: '/auth/login'
    }
})
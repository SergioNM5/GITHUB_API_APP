import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface User {
        accessToken: string
        username: string
        name: string
        email: string
        image: string
    }

    interface Session {
        user: User
    }
}

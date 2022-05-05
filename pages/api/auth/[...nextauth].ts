import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export default NextAuth({
    session: {
        strategy: 'jwt'
    },
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            authorization: {
                params: {
                    // I wish to request additional permission scopes.
                    scope: 'repo read:user user:email',
                },
            },
        }),
        // ...add more providers here
    ],
    callbacks: {
        async session({session, token}) {
            session.accessToken = token.accessToken

            return session
        },
        async jwt({token, user, account, profile}) {
            // when user comes back after SignIn, we make sure to save the accessToken from
            // the logged user, otherwise it would be discarded. We need to make API calls to Github API
            // on behalf of the logged user, so here we persist the token, since its gonna be needed.
            if (user && account && account.provider === 'github') {
                token.username = profile?.login; // save the github username
                token.accessToken = account.access_token // get the github accessToken from the user who signed in
            }

            return Promise.resolve(token);
        },
    }
})

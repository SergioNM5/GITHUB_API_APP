export interface Providers {
    github: Provider
}

export interface Provider {
    id: string,
    name: string,
    type: string,
    signinUrl: string,
    callbackUrl: string
}



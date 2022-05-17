import type {GetServerSideProps, NextPage} from 'next'
import {getSession} from "next-auth/react";

const Home: NextPage = () => {
    return (
        <div>

        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const session = await getSession(context)

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    return {
        redirect: {
            destination: '/my-account',
            permanent: false
        }
    }
}


export default Home

import React from 'react';
import {GetServerSideProps} from "next";
import Layout from "../../../components/Layout/Layout";
import {getSession} from "next-auth/react";

const RepoPage = ({repoData}:{repoData: any}) => {

    console.log(repoData)

    return (
        <Layout>
            <div >
                {repoData.name}
            </div>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

    const userId = context?.params?.userId;
    const repoName = context?.params?.repoName
    const session = await getSession(context);

    const repoResponse = await fetch (`https://api.github.com/repos/${userId}/${repoName}`, {
        headers: {
            authorization: `token ${session?.user.accessToken}`
        }
    });

    if(!repoResponse.ok) {
        return {
            notFound: true
        }
    }

    const repoData = await repoResponse.json()

    return {
        props: {
            repoData
        }
    }

}

export default RepoPage;

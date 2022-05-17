import React, {Fragment, useEffect} from 'react';
import {GetServerSideProps} from 'next'
import {getSession} from "next-auth/react";
import {Session} from "next-auth";
import {createMap, forMember, mapFrom} from "@automapper/core";
import {mapper} from "../mappings/mapper";
import {User} from "../models/User/User.entity";
import {UserDto} from "../models/User/User.dto";
import Layout from "../components/Layout/Layout";
import classes from '../styles/MyAccount.module.css'
import {Card, CardContent, Typography} from "@mui/material";
import RepoCard from "../components/RepoCard";
import {Repos} from "../models/Repos/Repos.entity";
import {ListReposDto} from "../models/Repos/Repos.dto";
import {userDataMapper} from "../services/userDataMapper";
import {repoDataMapper} from "../services/repoDataMapper";
import Image from "next/image";

const MyAccountPage = ({userDto, reposDto}: { userDto: UserDto, reposDto: ListReposDto[] }) => {

    return (
        <Layout>
            {userDto && reposDto && (
            <div className={classes.my_account__container}>
                <div className={classes.user}>
                    <div className={classes.user__info}>
                        <div className={classes.user__info__data}>
                            <Image
                                priority
                                width='60px'
                                height='60px'
                                src={`${userDto.profileImage}`}
                                alt='Avatar Image'
                                className={classes.avatar_image}
                            />
                            <div>
                                <Typography sx={{fontSize: 14}}>{userDto.name}</Typography>
                                {userDto.email && <Typography sx={{fontSize: 12}}>ID: {userDto.email}</Typography>}
                                <Typography sx={{fontSize: 12}}>ID: {userDto.username}</Typography>
                            </div>
                        </div>
                        <div className={classes.horizontal__line}/>
                        <div className={classes.user__info__numbers}>
                            <Typography sx={{fontSize: 14}}>{userDto.followers} followers </Typography>
                            <Typography sx={{fontSize: 14}}>{userDto.following} following </Typography>
                        </div>
                    </div>
                    <div className={classes.repositories__container}>
                        <h4>Repositories</h4>
                        <div className={classes.repositories__list}>
                            {reposDto.map(repo => {
                                return (
                                    <RepoCard key={repo.repoName} repo={repo}/>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            )}
        </Layout>
    );
};


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

    const userResponse = await fetch(`https://api.github.com/users/${session?.user.username}`, {
        headers: {
            authorization: `token ${session?.user.accessToken}`
        }
    });
    const userData = await userResponse.json();
    const userDto = userDataMapper(userData);


    const reposResponse = await fetch(`https://api.github.com/users/${session?.user.username}/repos`, {
        headers: {
            authorization: `token ${session?.user.accessToken}`
        }
    });
    const reposData = await reposResponse.json();
    const reposDto = repoDataMapper(reposData);

    return {
        props: {
            userDto: JSON.parse(JSON.stringify(userDto)),
            reposDto: JSON.parse(JSON.stringify(reposDto)),
        }
    }
}

export default MyAccountPage;

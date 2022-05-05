import React from 'react';
import {Button, Card, CardActions, CardContent, Container, Typography} from "@mui/material";
import classes from "../styles/Login.module.css"
import Image from 'next/image'
import {getProviders, getSession, signIn} from "next-auth/react";
import { GetServerSideProps } from 'next'
import {Providers} from "../models/Providers.model";


const LoginPage = ({providers}: {providers: Providers}) => {

    return (
        <Container>
            <div className={classes.login__container}>
                <Card sx={{
                    width: 485,
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <CardContent sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <Image
                            priority
                            width='60px'
                            height='60px'
                            src='/images/github_icon.png'
                            alt='Banner del hotel'
                        />
                        <Typography variant='h6' sx={{
                            marginTop: '30px'
                        }}>
                            Log in to your account
                        </Typography>
                    </CardContent>
                    <Button
                        variant={"contained"}
                        sx={{backgroundColor: '#1B5F74', width: '80%', margin: '30px 0'}}
                        onClick={() => signIn(providers.github.id)}
                    >
                        SIGN IN WITH GITHUB
                    </Button>
                </Card>
            </div>
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const providers = await getProviders();
    const session = await getSession(context)

    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            providers,
            session
        }
    }
}

export default LoginPage;

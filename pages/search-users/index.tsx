import React, {useState} from 'react';
import classes from "../../styles/SearchUsers.module.css";
import SearchBar from "../../components/UI/SearchBar";
import Layout from "../../components/Layout/Layout";
import {getSession, useSession} from "next-auth/react";
import {UserDto} from "../../models/User/User.dto";
import {userDataMapper} from "../../services/userDataMapper";
import Image from "next/image";
import {Typography} from "@mui/material";
import {GetServerSideProps} from "next";

const SearchUsersPage = () => {

    const [searchText, setSearchText] = useState('');
    const [user, setUser] = useState<UserDto | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>()
    const {data} = useSession();


    const onSearchTextChange = (text: string) => {
        setSearchText(text)
    }

    const onSearch = async (e: React.MouseEvent<HTMLButtonElement>) => {
        setError(null)
        setUser(null)

        if (!searchText || searchText.length < 3) {
            setError('The field cant be empty / the username must be longer than 3 characters ')
        } else {
            try {
                setLoading(true);

                const userResponse = await fetch(`https://api.github.com/users/${searchText}`, {
                    headers: {
                        authorization: `token ${data?.user.accessToken}`
                    }
                });
                console.log(userResponse)
                if (!userResponse.ok) {
                    throw new Error('User not found')
                }
                const userData = await userResponse.json();
                const userDto = userDataMapper(userData);
                setUser(userDto)
            } catch (error: any) {
                console.log(error)
                setError(error.message)
            }
            setLoading(false)
        }
    }

    return (
        <Layout>
            <div className={classes.search_users__container}>
                <h2 className={classes.title}>Search <span>Users</span></h2>
                <SearchBar onChange={onSearchTextChange} onClick={onSearch}/>
                {user &&
                    <div className={classes.user__info}>
                        <div className={classes.user__info__data}>
                            <Image
                                priority
                                width='60px'
                                height='60px'
                                src={`${user.profileImage}`}
                                alt='Avatar Image'
                                className={classes.avatar_image}
                            />
                            <div>
                                {user.name && <Typography sx={{fontSize: 14}}>{user.name}</Typography>}
                                {user.email && <Typography sx={{fontSize: 12}}>ID: {user.email}</Typography>}
                                <Typography sx={{fontSize: 12}}>ID: {user.username}</Typography>
                            </div>
                        </div>
                        <div className={classes.horizontal__line}/>
                        <div className={classes.user__info__numbers}>
                            <Typography sx={{fontSize: 14}}>{user.followers} followers </Typography>
                            <Typography sx={{fontSize: 14}}>{user.following} following </Typography>
                        </div>
                    </div>
                }
                {loading && <p>Loading....</p>}
                {error && <p>{error}</p>}
            </div>

        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    return {
        props: {
            session
        }
    }
}


export default SearchUsersPage;

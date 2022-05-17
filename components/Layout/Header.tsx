import React from 'react';
import {AppBar, Box, IconButton, Toolbar, Typography, Button, Menu, MenuItem} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Image from "next/image";
import Link from 'next/link'
import {useSession, signOut} from "next-auth/react";
import classes from '../../styles/Header.module.css'

const pages = [{name: 'Search Users', path: 'search-users'}, {
    name: 'Search Repositories',
    path: 'search-repos'
}, {name: 'My Account', path: 'my-account'}, {name: 'Logout'}];

const Header = () => {

    const [anchorElNav, setAnchorElNav] = React.useState<HTMLButtonElement | null>(null);

    const {data: session, status} = useSession();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    let imageUrl;
    if (status === 'authenticated') {
        imageUrl = session?.user.image
    }

    return (
        <Box>
            <AppBar position="static" sx={{backgroundColor: '#ffffff'}}>
                <Toolbar sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Image
                            priority
                            width='50px'
                            height='50px'
                            src='/images/github_icon.png'
                            alt='Avatar'
                        />
                        <Typography color={'black'} variant='h6' sx={{ml: 1}}>GITHUB</Typography>
                    </Box>

                    <Box sx={{
                        display: {xs: 'none', md: 'flex'}
                    }}>
                        <Link href='/search-users' passHref>
                            <Button sx={{color: '#000000'}}>Search Users</Button>
                        </Link>
                        <Link href='/search-repos' passHref>
                            <Button sx={{color: '#000000'}}>Search Repositories</Button>
                        </Link>
                        <Button onClick={() => signOut({callbackUrl:'/login'})} sx={{color: '#000000'}}>Logout</Button>
                        {imageUrl && (
                            <Box sx={{cursor: 'pointer'}}>
                                <Link href='/my-account'>
                                    <Image
                                        priority
                                        width='50px'
                                        height='50px'
                                        src={`${imageUrl}`}
                                        alt='avatar'
                                        className={classes.avatar_image}
                                    />
                                </Link>
                            </Box>
                        )}
                    </Box>
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="menu"
                        sx={{
                            display: {xs: 'flex', md: 'none', colo: 'black'}
                        }}
                        onClick={handleOpenNavMenu}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Menu
                        sx={{mt: '45px'}}
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                    >
                        {pages.map((page) => {
                            return page.name === 'Logout' ? (
                                <MenuItem>
                                    <Typography onClick={() => signOut({callbackUrl:'/login'})} textAlign="center">{page.name}</Typography>
                                </MenuItem>
                            ) : (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                    <Link href={`/${page.path}`}>
                                        <Typography textAlign="center">{page.name}</Typography>
                                    </Link>
                                </MenuItem>
                            )
                        } )}
                    </Menu>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;

import React from 'react';
import {AppBar, Box, IconButton, Toolbar, Typography, Button, Menu, MenuItem} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Image from "next/image";
import Link from 'next/link'
import {useSession} from "next-auth/react";

const pages = [{name: 'Search Users', path: 'search-users'}, {
    name: 'Search Repositories',
    path: 'search-repos'
}, {name: 'My Account', path: 'my-account'}];

const Header = () => {

    const {data: session} = useSession()
    console.log(session)
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event: any) => {
        console.log(event.currentTarget)
        setAnchorElNav(event);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

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
                            alt='Banner del hotel'
                        />
                        <Typography color={'black'} variant='h6' sx={{ml: 1}}>GITHUB</Typography>
                    </Box>

                    <Box sx={{
                        display: {xs: 'none', md: 'flex'}
                    }}>
                        <Button sx={{color: '#000000'}}>Search Users</Button>
                        <Button sx={{color: '#000000'}}>Search Repositories</Button>
                        <Link href='/my-account'>
                            <Image
                                priority
                                width='50px'
                                height='50px'
                                src='/images/github_icon.png'
                                alt='Banner del hotel'
                            />
                        </Link>
                    </Box>
                    <IconButton
                        size="large"
                        edge="start"
                        color="secondary"
                        aria-label="menu"
                        sx={{
                            display: {xs: 'flex', md: 'none'}
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
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                    <Link href={`/${page.path}`}>
                                        <Typography textAlign="center">{page.name}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;

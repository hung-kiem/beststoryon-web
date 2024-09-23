import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Link as MuiLink, Container } from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { ROUTE_LIST } from './routes';
import Link from 'next/link';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import MenuIcon from '@mui/icons-material/Menu';

export function HeaderMobile() {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => () => {
        setOpen(!open);
    };

    return (
        <Box
            display={{
                xs: 'block',
                sm: 'none',
            }}
        >
            <Container sx={{ mt: 1 }}>
                <MenuIcon onClick={toggleDrawer()} />
                <SwipeableDrawer
                    anchor={'left'}
                    open={open}
                    onClose={toggleDrawer()}
                    onOpen={toggleDrawer()}
                >
                    {ROUTE_LIST.map((route) => (
                        <Link
                            key={route.path}
                            href={route.path}
                            passHref
                            legacyBehavior
                        >
                            <MuiLink
                                sx={{ ml: 2, mr: 2, mt: 2 }}
                                underline='none'
                                className={clsx({
                                    active: route.path === router.pathname,
                                })}
                            >
                                {route.label}
                            </MuiLink>
                        </Link>
                    ))}
                </SwipeableDrawer>
            </Container>
        </Box>
    );
}

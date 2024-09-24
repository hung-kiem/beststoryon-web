import { Facebook, Instagram, Twitter, LinkedIn } from '@mui/icons-material';
import { Icon, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export function Footer() {
    const socialLinks = [
        {
            name: 'Twitter',
            url: 'https://twitter.com/',
            icon: Twitter,
        },
        {
            name: 'Facebook',
            url: 'https://www.facebook.com/',
            icon: Facebook,
        },
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/',
            icon: Instagram,
        },
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/',
            icon: LinkedIn,
        },
    ];

    return (
        <Box
            component='footer'
            py={2}
            textAlign='center'
        >
            <Stack
                direction='row'
                justifyContent='center'
            >
                {socialLinks.map((link, index) => (
                    <Box
                        key={index}
                        component='a'
                        p={2}
                        href={link.url}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <Icon
                            component={link.icon}
                            sx={{
                                fontSize: 48,
                            }}
                        />
                    </Box>
                ))}
            </Stack>
            <Typography>
                Copyright @{new Date().getFullYear()} All rights reserved
            </Typography>
        </Box>
    );
}

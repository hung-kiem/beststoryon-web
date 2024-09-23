import { Box, Button, Container, Stack, Typography } from '@mui/material';
import * as React from 'react';
import avatar from '@images/avatar.png';
import Image from 'next/image';

export function HeroSection() {
    return (
        <Box
            component='section'
            pt={{ xs: 4, sm: 18 }}
            pb={{ xs: 7, sm: 9 }}
        >
            <Container>
                <Stack
                    direction={{ xs: 'column-reverse', md: 'row' }}
                    alignItems={{ xs: 'center', md: 'flex-start' }}
                    textAlign={{ xs: 'center', md: 'left' }}
                    spacing={4}
                >
                    <Box>
                        <Typography
                            component='h1'
                            variant='h3'
                            fontWeight='bold'
                            mb={{ xs: 3.5, md: 5 }}
                        >
                            Hi, I am John,
                            <br />
                            Creative Technologist
                        </Typography>
                        <Typography mb={{ xs: 3.5, md: 5 }}>
                            Amet minim mollit non deserunt ullamco est sit
                            aliqua dolor do amet sint. Velit officia consequat
                            duis enim velit mollit. Exercitation veniam
                            consequat sunt nostrud amet.
                        </Typography>
                        <Button
                            variant='contained'
                            size='large'
                        >
                            Download Resume
                        </Button>
                    </Box>

                    <Box
                        sx={{
                            minWidth: '240px',
                            boxShadow: '-5px 13px',
                            color: 'secondary.light',
                            borderRadius: '50%',
                        }}
                    >
                        <Image
                            src={avatar}
                            alt='avatar'
                            layout='responsive'
                        />
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
}

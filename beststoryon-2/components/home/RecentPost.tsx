import {
    Box,
    Container,
    Stack,
    Typography,
    Link as MuiLink,
} from '@mui/material';
import Link from 'next/link';
import * as React from 'react';
import { PostCard } from './PostCard';
import { Post } from '@/models';

const fakePostList: Post[] = [
    {
        id: '1',
        title: 'How to create a website?',
        description:
            'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
        tagList: ['Web Development'],
        publishedAt: '2021-10-20',
    },
    {
        id: '2',
        title: 'How to create a website?',
        description:
            'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
        tagList: ['Web Development'],
        publishedAt: '2021-10-20',
    },
];

export function RecentPost() {
    return (
        <Box
            component='section'
            bgcolor={'secondary.light'}
            py={4}
        >
            <Container>
                <Stack
                    direction='row'
                    mb={2}
                    justifyContent='space-between'
                    alignItems='center'
                >
                    <Typography variant='h5'>Recent post</Typography>
                    <Link
                        passHref
                        href='/categories'
                        legacyBehavior
                    >
                        <MuiLink>View all</MuiLink>
                    </Link>
                </Stack>
                <Stack
                    direction={{
                        xs: 'column',
                        md: 'row',
                    }}
                    spacing={3}
                    sx={{
                        '& > div ': {
                            width: ['100%', '50%'],
                        },
                    }}
                >
                    {fakePostList.map((post) => (
                        <Box key={post.id}>
                            <PostCard post={post} />
                        </Box>
                    ))}
                </Stack>
            </Container>
        </Box>
    );
}

import { Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { Post } from '@/models';

export interface PostCardProps {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {
    if (!post) {
        return null;
    }
    return (
        <Card>
            <CardContent>
                <Typography
                    variant='h5'
                    fontWeight='bold'
                >
                    {post.title}
                </Typography>
                <Stack
                    direction='row'
                    my={2}
                >
                    <Typography variant='body1'>{post.publishedAt}</Typography>
                    <Divider
                        orientation='vertical'
                        flexItem
                        sx={{
                            mx: 2,
                        }}
                    />
                    <Typography variant='body1'>
                        {post.tagList.join(', ')}
                    </Typography>
                </Stack>
                <Typography variant='body2'>{post.description}</Typography>
            </CardContent>
        </Card>
    );
}

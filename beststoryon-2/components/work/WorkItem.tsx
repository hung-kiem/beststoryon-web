import { Work } from '@/models';
import { Box, Chip, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

export interface IWorkItemProps {
    work: Work;
}

export function WorkItem({ work }: IWorkItemProps) {
    return (
        <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
        >
            <Box
                width={{ xs: '100%', md: '246px' }}
                flexShrink={0}
            >
                <Image
                    src={work.thumbnailUrl}
                    width={246}
                    height={180}
                    layout='responsive'
                    alt='work thumbnail'
                />
            </Box>
            <Box>
                <Typography
                    variant='h6'
                    fontWeight='bold'
                >
                    {work.title}
                </Typography>
                <Stack
                    direction='row'
                    spacing={3}
                    my={2}
                >
                    <Chip
                        color='secondary'
                        label={work.createdAt}
                        size='small'
                    />
                    <Typography color='GrayText'>
                        {work.tagList.join(', ')}
                    </Typography>
                </Stack>
                <Typography>{work.shortDescription}</Typography>
            </Box>
        </Stack>
    );
}

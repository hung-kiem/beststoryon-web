import { Box, Container, Typography } from '@mui/material';
import * as React from 'react';
import { Work } from '@/models';
import { WorkList } from '../work';

const fakeWorkList: Work[] = [
    {
        id: '1',
        title: 'Designing Dashboards',
        createdAt: '1648363391671',
        updatedAt: '1648363391671',
        tagList: ['Dashboard'],
        shortDescription:
            'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
        fullDescription: '',
        thumbnailUrl:
            'https://images.unsplash.com/photo-1726931598787-00b60840177c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: '2',
        title: 'Vibrant Portraits of 2020',
        createdAt: '1648363391671',
        updatedAt: '1648363391671',
        tagList: ['Illustration'],
        shortDescription:
            'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
        fullDescription: '',
        thumbnailUrl:
            'https://images.unsplash.com/photo-1726931598787-00b60840177c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: '3',
        title: '36 Days of Malayalam type',
        createdAt: '1648363391671',
        updatedAt: '1648363391671',
        tagList: ['Typography'],
        shortDescription:
            'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
        fullDescription: '',
        thumbnailUrl:
            'https://images.unsplash.com/photo-1726931598787-00b60840177c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
];

export function FeaturedWork() {
    return (
        <Box
            component='section'
            pt={2}
            pb={4}
        >
            <Container>
                <Typography variant='h5'>Featured work</Typography>
                <WorkList workList={fakeWorkList} />
            </Container>
        </Box>
    );
}

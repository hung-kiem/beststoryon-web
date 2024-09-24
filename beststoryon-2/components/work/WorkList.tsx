import { Work } from '@/models';
import { Box, Divider } from '@mui/material';
import React, { Fragment } from 'react';
import { WorkItem } from './WorkItem';

export interface IWorkListProps {
    workList: Work[];
}

export function WorkList({ workList }: IWorkListProps) {
    if (workList.length === 0) return null;

    return (
        <Box>
            {workList.map((work) => (
                <Fragment key={work.id}>
                    <WorkItem work={work} />
                    <Divider sx={{ my: 3 }} />
                </Fragment>
            ))}
        </Box>
    );
}

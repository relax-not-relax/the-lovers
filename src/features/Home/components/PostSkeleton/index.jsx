import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Skeleton } from '@mui/material';
import './style.scss';

PostSkeleton.propTypes = {
    length: PropTypes.number,
};

PostSkeleton.defaultProps = {
    length: 5,
};

function PostSkeleton(props) {

    const { length } = props;

    return (
        <Box>
            {Array.from(new Array(length)).map((x, idx) => (
                <Box className='postSkeleton' key={idx}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Skeleton variant="circular" width={40} height={40} />
                        </Grid>
                        <Grid item>
                            <Skeleton variant="rectangular" width={100} height={40} />
                        </Grid>
                    </Grid>
                    <Skeleton variant="rectangular" width='100%' height={80} style={{ marginTop: '20px' }} />
                    <Skeleton variant="rectangular" width={250} height={30} style={{ marginTop: '20px' }} />
                </Box>
            ))}
        </Box>
    );
}

export default PostSkeleton;
import avatar from '../../images/avatar.png'
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
//import PropTypes from 'prop-types';
import './style.scss';

Profile.propTypes = {

};

function Profile(props) {
    return (
        <Box className='profileDiv'>
            <Box>
                <Grid container spacing={1}>
                    <Grid item md={3} lg={3}>
                        <img src={avatar} alt="" width='80%' />
                    </Grid>
                    <Grid item md={9} lg={9}>
                        <Box>
                            <Typography className='accountName'>Minh Nguyen</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Profile;
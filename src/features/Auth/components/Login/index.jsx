import { Box, Grid } from '@mui/material';
import React from 'react';
import './style.scss';
import loginImg from '../../../../images/logo2.png'
import LoginForm from '../LoginForm';

LoginFeature.propTypes = {

};

function LoginFeature(props) {
    return (
        <Box className='loginSection'>
            <Box className='loginDiv'>
                <Grid container>
                    <Grid item md={6} lg={6} paddingRight={4}>
                        <img src={loginImg} alt="" width='100%' />
                    </Grid>
                    <Grid item md={6} lg={6} paddingLeft={2}>
                        <LoginForm />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default LoginFeature;
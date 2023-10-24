import { Alert, AlertTitle, Box, Grid } from '@mui/material';
import React from 'react';
import './style.scss';
import loginImg from '../../../../images/logo2.png'
import LoginForm from '../LoginForm';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { login } from '../../userSlice';
import { useState } from 'react';

LoginFeature.propTypes = {

};

function LoginFeature(props) {

    const dispatch = useDispatch();
    const [error, setError] = useState('');

    const handleSubmit = async (values) => {
        try {

            const action = login(values);
            const resultAction = await dispatch(action);
            unwrapResult(resultAction);

            setError('');
            window.location.reload();

        } catch (error) {
            //console.log('Failed to get user: ', error);
            setError('Failed to get user!');
        }
    }

    return (
        <Box className='loginSection'>
            <Box className='loginDiv'>
                <Grid container>
                    <Grid item md={6} lg={6} paddingRight={4}>
                        <img src={loginImg} alt="" width='100%' />
                    </Grid>
                    <Grid item md={6} lg={6} paddingLeft={2}>
                        <LoginForm onSubmit={handleSubmit} />
                        {error !== '' && (
                            <>
                                <Alert severity="error">
                                    <AlertTitle>Error</AlertTitle>
                                    {error} — <strong>Email or Password is invalid</strong>
                                </Alert>
                            </>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default LoginFeature;
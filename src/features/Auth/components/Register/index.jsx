import { Alert, AlertTitle, Box } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../userSlice';
import RegisterForm from '../RegisterForm';
import './style.scss';

RegisterFeature.propTypes = {

};

function RegisterFeature(props) {

    const dispatch = useDispatch();
    const [newUser, setNewUser] = useState({});
    const [error, setError] = useState('');

    const handleSubmit = async (values) => {

        try {
            const action = register(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);

            console.log('New user: ', user);
            setNewUser(user);
            setError('');
            setTimeout(() => {
                window.location.reload();
            }, 2000);

        } catch (error) {
            console.log('Failed to register user: ', error);
            setError('Failed to register user!');
        }
    };


    return (
        <Box className='registerSection'>
            <Box className='registerDiv'>
                <RegisterForm onSubmit={handleSubmit} />
                {Object.keys(newUser).length > 0 && (
                    <>
                        <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                            Register successfully — <strong>check it out!</strong>
                        </Alert>
                    </>
                )}
                {error !== '' && (
                    <>
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            {error} — <strong>Email or Password is invalid</strong>
                        </Alert>
                    </>
                )}

            </Box>
        </Box>
    );
}

export default RegisterFeature;
import { Box } from '@mui/material';
import React from 'react';
import RegisterForm from '../RegisterForm';
import './style.scss';

RegisterFeature.propTypes = {

};

function RegisterFeature(props) {
    return (
        <Box className='registerSection'>
            <Box className='registerDiv'>
                <RegisterForm />
            </Box>
        </Box>
    );
}

export default RegisterFeature;
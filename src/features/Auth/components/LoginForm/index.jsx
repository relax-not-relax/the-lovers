import React from 'react';
//import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, LinearProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import * as yup from 'yup';
import InputField from '../../../../components/form-controls/InputField';
import PasswordField from '../../../../components/form-controls/PasswordField';
import title from '../../../../images/logo3.png';
import './style.scss';

LoginForm.propTypes = {
    //onSubmit: PropTypes.func,
};

function LoginForm(props) {

    const schema = yup.object().shape({
        email: yup.string()
            .required('Please enter your email address')
            .email('Please enter a valid email address'),
        password: yup.string()
            .required('Please enter your password'),
    });

    const form = useForm({
        defaultValue: {
            // identifier: '',
            email: '',
            password: '',
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (values) => {
        //console.log('LOGIN FORM: ', values);
        const { onSubmit } = props;
        if (onSubmit) {
            await onSubmit(values);
        }

        //form.reset();
    }

    const { isSubmitting } = form.formState;

    return (
        <Box>
            {isSubmitting && <LinearProgress className='loginForm__pg' />}
            <div className='loginForm'>
                <img src={title} alt="" width='100%' />
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <InputField name='email' label='Email' form={form} errors={form.formState.errors} />
                    <PasswordField name='password' label='Password' form={form} errors={form.formState.errors} />
                    <Button disabled={isSubmitting} type='submit' fullWidth variant='contained' className="loginForm__btn">
                        Login
                    </Button>
                </form>
            </div>
            <div className='signUpDiv'>
                <p>Don't have an account?</p>
                <NavLink to="/register" className='signUpDiv__link'>Sign up</NavLink>
            </div>
        </Box>
    );
}

export default LoginForm;
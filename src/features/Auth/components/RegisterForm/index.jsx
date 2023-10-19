import React from 'react';
//import PropTypes from 'prop-types';
import logo from '../../../../images/logo.png';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../../components/form-controls/InputField';
import PasswordField from '../../../../components/form-controls/PasswordField';
import './style.scss';
import { Box, Button } from '@mui/material';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';

RegisterForm.propTypes = {
    //onSubmit: PropTypes.func,
};

function RegisterForm(props) {

    const schema = yup.object().shape({
        fullName: yup.string()
            .required('Please enter your full name')
            .test('Should has at least two words', 'Please enter at least two words', (value) => {
                return value.split(' ').length >= 2;
            }),
        email: yup.string()
            .required('Please enter your email')
            .email('Please enter a valid email address'),
        password: yup.string()
            .required('Please enter your password')
            .min(6, 'Please enter at least 6 characters'),
        confirmPassword: yup.string()
            .required('Please confirm your password')
            .oneOf([yup.ref('password'), 'Password does not match']),
    });

    const form = useForm({
        defaultValue: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        resolver: yupResolver(schema),
    })

    const handleSubmit = async (values) => {
        console.log('LOGIN FORM: ', values);
        // const { onSubmit } = props;
        // if (onSubmit) {
        //     await onSubmit(values);
        // }

        //form.reset();
    }

    const { isSubmitting } = form.formState;

    return (
        <Box>
            <div className='registerForm'>
                <Box>
                    <div className='registerForm__img'>
                        <img src={logo} alt="" width='60%' />
                    </div>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <InputField name='fullName' label='Full Name' form={form} errors={form.formState.errors} />
                        <InputField name='email' label='Email' form={form} errors={form.formState.errors} />
                        <PasswordField name='password' label='Password' form={form} errors={form.formState.errors} />
                        <PasswordField name='confirmPassword' label='Confirm Password' form={form} errors={form.formState.errors} />
                        <Button disabled={isSubmitting} type='submit' fullWidth variant='contained' className="registerForm__btn">
                            Sign Up
                        </Button>
                    </form>
                </Box>
            </div>
            <div className='signUpDiv'>
                <p>Have an account?</p>
                <NavLink to="/" className='signUpDiv__link'>Login</NavLink>
            </div>
        </Box>

    );
}

export default RegisterForm;
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../../components/form-controls/InputField';
import './style.scss';

GiftForm.propTypes = {
    onSubmit: PropTypes.func,
};

function GiftForm(props) {

    const { onSubmit = null } = props;

    const schema = yup.object().shape({
        giftName: yup.string()
            .required('Please enter gift name'),
        giftDes: yup.string(),
    });

    const form = useForm({
        defaultValue: {
            // identifier: '',
            giftName: '',
            giftDes: '',
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (values) => {
        if (onSubmit) {
            await onSubmit(values);
        }

        form.reset();
    }

    return (
        <div>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Typography className='giftFormTitle'>Add a gift</Typography>
                <InputField name='giftName' label='Gift Name' form={form} errors={form.formState.errors} />
                <InputField name='giftDes' label='Gift Description' form={form} errors={form.formState.errors} />
                <Box style={{ padding: '0 100px' }}>
                    <Button type='submit' fullWidth variant='contained' className='giftFormBtn'>
                        ADD
                    </Button>
                </Box>
            </form>
        </div>
    );
}

export default GiftForm;
import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import DateField from '../../../../components/form-controls/DateField';
import PriceField from '../../../../components/form-controls/PriceField';

ScheduleForm.propTypes = {
    onSubmit: PropTypes.func,
};

function ScheduleForm(props) {

    const { onSubmit = null } = props;
    const now = new Date();

    const schema = yup.object().shape({
        price: yup.number()
            .required('Please enter service price')
            .min(1000, 'Minimum price is 1000')
            .typeError('Please enter a number'),
        startDate: yup
            .date()
            .required('Please enter service start date')
            .min(now, 'Start date must be after or equal to today'),
        endDate: yup
            .date()
            .required('Please enter service end date')
            .min(yup.ref('startDate'), 'End date must be after the start date')
    });

    const form = useForm({
        defaultValue: {
            price: 0,
            startDate: '',
            endDate: '',
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
                <Typography className='serviceFormTitle'>Add Service's Schedule</Typography>
                <DateField name='startDate' label='Start Date' form={form} errors={form.formState.errors} />
                <DateField name='endDate' label='End Date' form={form} errors={form.formState.errors} />
                <PriceField name='price' label='Price' form={form} errors={form.formState.errors} />
                <Box style={{ padding: '0 100px' }}>
                    <Button type='submit' fullWidth variant='contained' className='serviceFormBtn'>
                        ADD
                    </Button>
                </Box>
            </form>
        </div>
    );
}

export default ScheduleForm;
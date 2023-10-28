import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, LinearProgress, Typography } from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import DateField from '../../../../components/form-controls/DateField';
import InputField from '../../../../components/form-controls/InputField';
import PriceField from '../../../../components/form-controls/PriceField';
import './style.scss';

ServiceForm.propTypes = {
    onSubmit: PropTypes.func,
};

function ServiceForm(props) {

    const { onSubmit = null } = props;
    const now = new Date();

    const schema = yup.object().shape({
        serviceName: yup.string()
            .required('Please enter service name'),
        serviceDes: yup.string(),
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
            .min(yup.ref('startDate'), 'End date must be after the start date'),
        address: yup.string(),
    });

    const form = useForm({
        defaultValue: {
            serviceName: '',
            serviceDes: '',
            price: 0,
            startDate: '',
            endDate: '',
            address: '',
        },
        resolver: yupResolver(schema),
    });

    const [image, setImage] = useState({});
    const handleImage = (e) => {
        console.log(e.target.files);
        setImage({
            file: e.target.files[0],
        });
    };

    const handleImageLink = async () => {

        if (image.file) {
            const headers = {
                accept: "*/*",
                "Content-Type": "multipart/form-data",
            };

            const response = await axios.post("https://beprn231catdoglover20231017210252.azurewebsites.net/api/FireBase/UploadImageFile", image, { headers });

            if (response.status === 200) {
                console.log(response.data);
                return response.data;
            }
        } else {
            return '';
        }

    }

    const handleSubmit = async (values) => {

        if (onSubmit) {

            const imgLink = await handleImageLink();
            await onSubmit({ ...values, imageLink: imgLink });

        }

        form.reset();
    }

    const { isSubmitting } = form.formState;

    return (
        <div>
            {isSubmitting && <LinearProgress className='form__pg' />}
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Typography className='serviceFormTitle'>Add a service</Typography>
                <InputField name='serviceName' label='Service Name' form={form} errors={form.formState.errors} />
                <InputField name='serviceDes' label='Service Description' form={form} errors={form.formState.errors} />
                <InputField name='address' label='Address' form={form} errors={form.formState.errors} />

                <label className='uploadFile'>
                    <input type="file" name='file' onChange={handleImage} />
                    UPLOAD IMAGE
                </label>

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

export default ServiceForm;
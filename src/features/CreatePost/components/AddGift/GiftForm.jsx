import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, LinearProgress, Typography } from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
//import { useDropzone } from 'react-dropzone';
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
        description: yup.string(),
    });

    const form = useForm({
        defaultValue: {
            // identifier: '',
            giftName: '',
            description: '',
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
            await onSubmit({ ...values, imageLink: imgLink, giftComments: null, giftId: "string" });
        }

    }

    const { isSubmitting } = form.formState;

    return (
        <div>
            {isSubmitting && <LinearProgress className='form__pg' />}
            <form onSubmit={form.handleSubmit(handleSubmit)} id='formGift'>
                <Typography className='giftFormTitle'>Add a gift</Typography>
                <InputField name='giftName' label='Gift Name' form={form} errors={form.formState.errors} />
                <InputField name='description' label='Gift Description' form={form} errors={form.formState.errors} />

                <label className='uploadFile'>
                    <input type="file" name='file' onChange={handleImage} />
                    UPLOAD IMAGE
                </label>

                <Box style={{ padding: '0 100px' }}>
                    <Button disabled={isSubmitting} type='submit' fullWidth variant='contained' className='giftFormBtn' >
                        ADD
                    </Button>

                </Box>
            </form>
        </div>
    );
}

export default GiftForm;
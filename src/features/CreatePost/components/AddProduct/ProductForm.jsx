import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, LinearProgress, Typography } from '@mui/material';
import InputField from '../../../../components/form-controls/InputField';
import Select from 'react-select';
import PriceField from '../../../../components/form-controls/PriceField';
import './style.scss';
import { useState } from 'react';
import axios from 'axios';


ProductForm.propTypes = {
    onSubmit: PropTypes.func,
};

function ProductForm(props) {
    const { onSubmit = null } = props;
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [error, setError] = useState('');

    const schema = yup.object().shape({
        productName: yup.string()
            .required('Please enter product name'),
        productDes: yup.string(),
        price: yup.number()
            .required('Please enter product price')
            .min(1000, 'Minimum price is 1000')
            .typeError('Please enter a number'),
        category: yup.object(),
    });

    const form = useForm({
        defaultValue: {
            productName: '',
            productDes: '',
            price: 0,
            category: null,
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

    const categories = [
        { value: 1, label: 'Category 1' },
        { value: 2, label: 'Category 2' },
        { value: 3, label: 'Category 3' },
    ];

    const handleSubmit = async (values) => {
        if (!selectedCategory) {
            setError("Please select product's category");
        } else {

            setError('');

            const headers = {
                accept: "*/*",
                "Content-Type": "multipart/form-data",
            };

            if (onSubmit) {

                const imgLink = await axios
                    .post("https://beprn231catdoglover20231017210252.azurewebsites.net/api/FireBase/UploadImageFile", image, { headers })
                    .then((response) => {
                        if (response.status === 200) {
                            console.log(response.data);
                            return response.data;
                        }
                    });


                await onSubmit({ ...values, imgLink: imgLink });

            }

            form.reset();
        }
    }

    const handleCategoryChange = (selectedOption) => {
        setSelectedCategory(selectedOption);
        form.setValue('category', selectedOption);
    }

    const { isSubmitting } = form.formState;

    return (
        <div style={{ minHeight: '500px' }}>
            {isSubmitting && <LinearProgress className='form__pg' />}
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Typography className='productFormTitle'>Add a product</Typography>
                <InputField name='productName' label='Product Name' form={form} errors={form.formState.errors} />
                <InputField name='productDes' label='Product Description' form={form} errors={form.formState.errors} />
                <PriceField name='price' label='Price' form={form} errors={form.formState.errors} />
                <Select
                    className='selectCategory'
                    name='category'
                    label='Category'
                    placeholder="Category"
                    options={categories}
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                />
                {error && <span className="error">{error}</span>}

                <label className='uploadFile'>
                    <input type="file" name='file' onChange={handleImage} />
                    UPLOAD IMAGE
                </label>

                <Box style={{ padding: '0 100px' }}>
                    <Button type='submit' fullWidth variant='contained' className='giftFormBtn'>
                        ADD
                    </Button>
                </Box>
            </form>
        </div>
    );
}

export default ProductForm;
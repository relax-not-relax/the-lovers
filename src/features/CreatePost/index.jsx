import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
//import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../components/form-controls/InputField';
import './style.scss';
import AddGift from './components/AddGift';
import GiftList from './components/GiftList';
import AddProduct from './components/AddProduct';

CreateFeature.propTypes = {

};

function CreateFeature(props) {

    const [valueType, setValueType] = useState('gift');

    const schema = yup.object().shape({
        title: yup.string()
            .required('Please enter your post title'),
    });

    const form = useForm({
        defaultValue: {
            title: '',
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = (values) => {
        console.log('POST FORM: ', values);
    }

    const handleRadioChange = (event) => {
        setValueType(event.target.value);
    };

    const [gifts, setGifts] = useState([]);

    useEffect(() => {
        // Trong hàm này, bạn sẽ lấy giỏ hàng từ localStorage và cập nhật state cart.
        const getGiftsFromLocalStorage = () => {
            const gifts = localStorage.getItem('gifts');
            return gifts ? JSON.parse(gifts) : [];
        };

        const giftsFromLocalStorage = getGiftsFromLocalStorage();
        setGifts(giftsFromLocalStorage);
    }, []);

    return (
        <Box className="createSection">
            <Typography className='createSection__hd'>Create new post</Typography>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Box style={{
                    marginBottom: '20px'
                }}>

                    <Typography style={{
                        fontSize: '15px',
                        fontWeight: '500',
                    }}>
                        Title
                    </Typography>
                    <InputField name='title' label='Title' form={form} errors={form.formState.errors} />

                </Box>

                <Box style={{
                    marginBottom: '20px'
                }}>
                    <Typography style={{
                        fontSize: '15px',
                        fontWeight: '500',
                    }}>
                        Content
                    </Typography>
                    <textarea cols="110" rows="10" className='contentArea'></textarea>
                </Box>

                <Box>
                    <Typography style={{
                        fontSize: '15px',
                        fontWeight: '500',
                        marginBottom: '15px',
                    }}>
                        Type
                    </Typography>
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="gift"
                                checked={valueType === 'gift'}
                                onChange={handleRadioChange}
                            />
                            <span style={{ paddingLeft: '10px' }}>Gift</span>
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="service"
                                checked={valueType === 'service'}
                                onChange={handleRadioChange}
                            />
                            <span style={{ paddingLeft: '10px' }}>Service</span>
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="product"
                                checked={valueType === 'product'}
                                onChange={handleRadioChange}
                            />
                            <span style={{ paddingLeft: '10px' }}>Product</span>
                        </label>
                    </div>
                    <div id="content" style={{ display: 'flex', justifyContent: 'center' }}>
                        {valueType === 'gift' && (
                            <>
                                <Box>
                                    <GiftList giftList={gifts} />
                                    <AddGift />
                                </Box>
                            </>
                        )}
                        {valueType === 'service' && <p>Service Content</p>}
                        {valueType === 'product' && (
                            <>
                                <Box>
                                    <AddProduct />
                                </Box>
                            </>
                        )}
                    </div>
                </Box>
                <Box style={{ padding: '0 200px', marginTop: '50px' }}>
                    <Button type='submit' fullWidth variant='contained' className='createBtn'>
                        CREATE
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

export default CreateFeature;
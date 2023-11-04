import React from 'react';
import './style.scss';
import { Alert, AlertTitle, Box, Button, Grid, LinearProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { cartTotalSelector } from '../Cart/selector';
import { useEffect } from 'react';
import StorageKeys from '../../constants/storage-keys';
import { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import InputField from '../../components/form-controls/InputField';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CartItem from './components/CartItem';
import { formatPrice } from '../../utils';
import dateFormat from "dateformat";
import orderAPI from '../../api/orderApi';

CheckoutFeature.propTypes = {

};

function CheckoutFeature(props) {

    const cartTotal = useSelector(cartTotalSelector);
    const [userData, setUserData] = useState({});
    const [cart, setCart] = useState([]);
    const [success, setSuccess] = useState('');
    const now = new Date();

    useEffect(() => {
        const userDataFromLocalStorage = localStorage.getItem(StorageKeys.USER);

        if (userDataFromLocalStorage) {
            const parsedUserData = JSON.parse(userDataFromLocalStorage);
            setUserData(parsedUserData);
        }
    }, []);

    useEffect(() => {
        const getCartFromLocalStorage = () => {
            const cart = localStorage.getItem('cart');
            return cart ? JSON.parse(cart) : [];
        };

        const cartFromLocalStorage = getCartFromLocalStorage();
        setCart(cartFromLocalStorage);

    }, []);

    const schema = yup.object().shape({
        address: yup.string().required('Please enter sipping address'),
    });

    const form = useForm({
        resolver: yupResolver(schema),
    });


    const handlePlaceOrder = async (values) => {
        try {

            const orderDetails = cart.map((orderDt) => ({
                orderDetailId: 0,
                orderId: 0,
                type: orderDt.type,
                price: orderDt.cartItem.Price,
                itemId: orderDt.cartItem.ItemId,
                item: null,
                shipAddress: values.address
            }));

            const request = {
                orderId: 0,
                accountId: userData.accountId,
                totalPrice: cartTotal,
                orderDate: dateFormat(now, "isoUtcDateTime"),
                status: true,
                account: null,
                orderDetails: orderDetails
            }

            //console.log(request);
            await orderAPI.add(request);
            setSuccess('Order submitted successfully');
            localStorage.removeItem('cart');
            setTimeout(() => {
                window.location.href = '/orders';
            }, 3000);

        } catch (error) {
            console.log('Failed to submit order', error);
        }
    }


    const { isSubmitting } = form.formState;


    return (
        <Box className='checkoutSection'>
            <Box className='checkoutSection__header'>
                <Typography className='header'>Checkout</Typography>
                <BorderColorIcon fontSize='medium' />
            </Box>
            <Box className='orderView'>
                <Box>
                    {cart.map((item, index) => (
                        <Box key={index}>
                            <CartItem item={item} />
                        </Box>
                    ))}
                </Box>
                <Box>
                    <Grid container>
                        <Grid item md={9} lg={9}></Grid>
                        <Grid item md={1} lg={1} style={{
                            display: 'flex',
                            alignItems: 'flex-end',
                        }}>
                            <Typography style={{
                                fontSize: '16px !important',
                                color: '#7a7a7a',
                                paddingBottom: '5px'
                            }}>Total</Typography>
                        </Grid>
                        <Grid item md={2} lg={2} style={{
                            display: "flex",
                            justifyContent: "flex-end"
                        }}>
                            <Typography style={{
                                fontSize: '25px',
                                color: '#fd4d4d',
                                fontWeight: '500',
                            }}>{formatPrice(cartTotal)}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            {isSubmitting && <LinearProgress />}
            <form onSubmit={form.handleSubmit(handlePlaceOrder)}>
                <Box className='formDiv'>
                    <Grid container>
                        <Grid item md={2} lg={2} className='addressDiv'>
                            <Typography className='label'>Ship Address</Typography>
                        </Grid>
                        <Grid item md={6} lg={6}>
                            <InputField name='address' label='Ship Address' form={form} errors={form.formState.errors} />
                        </Grid>
                        <Grid item md={4} lg={4} className='orderBtnDiv'>
                            <Button disabled={isSubmitting} type='submit' fullWidth variant='contained' className='orderBtn' >
                                Place order
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </form>
            {success !== '' && (
                <>
                    <Box style={{ marginTop: '20px' }}>
                        <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                            {success} — <strong>Seller will contact you soon!</strong>
                        </Alert>
                    </Box>
                </>
            )}
        </Box>
    );
}

export default CheckoutFeature;
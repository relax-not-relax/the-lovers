import { ShoppingCart } from '@mui/icons-material';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import CartList from '../Cart/components/CartList';
import { cartTotalSelector } from './selector';
import './style.scss';


CartFeature.propTypes = {

};

function CartFeature(props) {

    const cartTotal = useSelector(cartTotalSelector);

    const [cart, setCart] = useState([]);

    useEffect(() => {
        const getCartFromLocalStorage = () => {
            const cart = localStorage.getItem('cart');
            return cart ? JSON.parse(cart) : [];
        };

        const cartFromLocalStorage = getCartFromLocalStorage();
        setCart(cartFromLocalStorage);
    }, []);

    return (
        <Box className='cartSection'>
            <Box className='cartSection__header'>
                <Typography className='header'>Cart</Typography>
                <ShoppingCart fontSize='medium' />
            </Box>

            <Paper className='cartSection__view' elevation={0}>
                <Grid container spacing={2}>
                    <Grid item md={8} lg={8} className='leftDivCart'>
                        <Box className='cartList'>
                            <CartList cartList={cart} />
                        </Box>
                    </Grid>
                    <Grid item md={4} lg={4}>
                        <Box className='cartPriceDetail'>
                            <Grid container className='rightDivCart__total'>
                                <Grid item md={6} lg={6} style={{
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    paddingBottom: '5px'
                                }}>
                                    <Typography className='rightDivCart__total-hd'>Total</Typography>
                                </Grid>
                                <Grid item md={6} lg={6} >
                                    <Typography className='rightDivCart__total-price'>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cartTotal)}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Box className='rightDivCart__btn'>
                                <NavLink className='rightDivCart__btn-dt' to='/checkout'>
                                    <Button fullWidth style={{ padding: '15px 0', background: '#002070', color: '#fff' }}>
                                        CHECKOUT
                                    </Button>
                                </NavLink>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}

export default CartFeature;
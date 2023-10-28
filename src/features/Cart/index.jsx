import { ShoppingBasket, ShoppingCart } from '@mui/icons-material';
import { Box, Grid, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import './style.scss';
import CartList from '../Cart/components/CartList'

CartFeature.propTypes = {

};

function CartFeature(props) {

    //const [cartList, setCartList] = useState([]);

    const cartListTmp = [
        {
            name: "Happy Hour",
            category: "Dog's Food",
            price: 120000
        },
        {
            name: "Melly",
            category: "Cat's Food",
            price: 150000
        },

    ];

    //setCartList(cartListTmp);

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
                            <CartList cartList={cartListTmp} />
                        </Box>
                    </Grid>
                    <Grid item md={4} lg={4}>
                        <Box className='cartPriceDetail'>

                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}

export default CartFeature;
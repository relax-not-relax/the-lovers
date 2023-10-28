import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import './style.scss';
import CartItem from '../CartItem';

CartList.propTypes = {
    cartList: PropTypes.array,
};

function CartList(props) {

    const { cartList } = props;

    return (
        <Box>
            {cartList.map((item, idx) => (
                <Box key={idx}>
                    <CartItem />
                </Box>
            ))}
        </Box>
    );
}

export default CartList;
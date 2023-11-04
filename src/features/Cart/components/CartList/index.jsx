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
    //console.log(cartList);

    return (
        <Box style={{
            marginTop: '20px',
            border: '1px solid #ccc',
            padding: '0 30px',
            borderRadius: '10px',
        }}>
            {cartList.map((item, idx) => (
                <Box key={idx}>
                    <CartItem item={item} />
                </Box>
            ))}
        </Box>
    );
}

export default CartList;
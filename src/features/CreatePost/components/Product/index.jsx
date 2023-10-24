import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Box, Typography } from '@mui/material';
import { formatPrice } from '../../../../utils'
import { useDispatch } from 'react-redux';
import { removeFromProductList } from '../AddProduct/productSlice';
import CancelProduct from './CancelProduct';

Product.propTypes = {
    product: PropTypes.object,
    index: PropTypes.number,
};

function Product(props) {

    const { product, index } = props;
    const dispatch = useDispatch();

    const handleCancel = () => {
        const action = removeFromProductList({
            indexToRemove: index,
        });

        dispatch(action);
        window.location.reload();
    }

    return (
        <Box className='productDiv'>
            <Box className='productDiv__img'>
                <img src={product.imgLink} alt="" />
            </Box>
            <Box className='productDiv__txt'>
                <Typography className='name'>{product.productName}</Typography>
                <Typography className='des'>{product.productDes}</Typography>
                <Typography className='cate'>{product.category.label}</Typography>
                <Typography className='price'>
                    {formatPrice(product.price)}
                </Typography>
            </Box>
            <Box>
                <CancelProduct onSubmit={handleCancel} />
            </Box>
        </Box>
    );
}

export default Product;
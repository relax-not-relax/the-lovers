import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import categoryApiOdata from '../../../../api/odata/categoryApiOdata';
import { Box, Button, Typography } from '@mui/material';
import { formatPrice } from '../../../../utils';

ProductDetail.propTypes = {
    product: PropTypes.object,
};

function ProductDetail(props) {

    const { product } = props;
    const [category, setCategory] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const response = await categoryApiOdata.getAll({
                    $filter: `CategoryId eq ${product.CategoryId}`
                });
                setCategory(response.value[0].CategoryName);

            } catch (error) {
                console.log('Failed to get category', error);
            }
        })()
    }, [product.CategoryId]);

    return (
        <Box className='productDiv'>
            <Box className='productDiv__img'>
                <img src={product.ImageLink} alt="" />
            </Box>
            <Box className='itemDiv__txt'>
                <Typography className='name'>{product.ProductName}</Typography>
                <Typography className='des'>{product.Description}</Typography>
                <Typography className='cate'>{category}</Typography>
                <Typography className='price'>
                    {formatPrice(product.Price)}
                </Typography>
            </Box>

            <Box>
                <Button fullWidth variant='contained' className='acceptBtn' >
                    Add to cart
                </Button>
            </Box>
        </Box>
    );
}

export default ProductDetail;
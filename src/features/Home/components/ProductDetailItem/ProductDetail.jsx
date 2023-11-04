import { Box, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import categoryApiOdata from '../../../../api/odata/categoryApiOdata';
import { formatPrice } from '../../../../utils';
import { addToCart } from '../../../Cart/cartSlice';

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


    const dispatch = useDispatch();

    const handleAddToCart = async () => {
        const action = addToCart({
            id: product.ProductId,
            cartItem: product,
            type: "product"
        });
        await dispatch(action);
    }

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

            {product.Status === true && (
                <>
                    <Box>
                        <Button fullWidth variant='contained' className='acceptBtn' onClick={handleAddToCart}>
                            Add to cart
                        </Button>
                    </Box>
                </>
            )}

        </Box>
    );
}

export default ProductDetail;
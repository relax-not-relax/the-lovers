import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Box, Typography } from '@mui/material';
import { formatPrice } from '../../../../utils';
import categoryApiOdata from '../../../../api/odata/categoryApiOdata';
import { useState } from 'react';

ProductItem.propTypes = {
    item: PropTypes.object,
};

function ProductItem(props) {

    const { item } = props;
    const [category, setCategory] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const response = await categoryApiOdata.getAll({
                    $filter: `CategoryId eq ${item.CategoryId}`
                });
                setCategory(response.value[0].CategoryName);

            } catch (error) {
                console.log('Failed to get category', error);
            }
        })()
    }, [item.CategoryId]);

    return (
        <Box className='productDiv'>
            <Box className='productDiv__img'>
                <img src={item.ImageLink} alt="" />
            </Box>
            <Box className='itemDiv__txt'>
                <Typography className='name'>{item.ProductName}</Typography>
                <Typography className='des'>{item.Description}</Typography>
                <Typography className='cate'>{category}</Typography>
                <Typography className='price'>
                    {formatPrice(item.Price)}
                </Typography>
            </Box>
        </Box>
    );
}

export default ProductItem;
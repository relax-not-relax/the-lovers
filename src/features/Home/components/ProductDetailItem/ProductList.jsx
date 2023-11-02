import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Box, Grid } from '@mui/material';
import ProductDetail from './ProductDetail';

ProductList.propTypes = {
    productList: PropTypes.array,
};

function ProductList(props) {

    const { productList } = props;

    return (
        <Box marginTop={3} className='productBoxContain'>
            <Grid container spacing={1}>
                {productList.map((product) => (
                    <Grid item key={product.ProductId} md={4} lg={4}>
                        <ProductDetail product={product} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default ProductList;
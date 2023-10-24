import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Grid } from '@mui/material';
import Product from '../Product';

ProductList.propTypes = {
    productList: PropTypes.array,
};

ProductList.defaultProps = {
    productList: [],
}

function ProductList(props) {

    const { productList } = props;

    return (
        <div style={{ margin: '40px 0' }}>
            <Grid container spacing={1}>
                {productList.map((product, index) => (
                    <Grid item key={index} md={4} lg={4}>
                        <Product product={product} index={index} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default ProductList;
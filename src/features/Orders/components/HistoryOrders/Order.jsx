import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import serviceSchedulerApiOdata from '../../../../api/odata/serviceSchedulerApiOdata';
import serviceApiOdata from '../../../../api/odata/serviceApiOdata';
import productApiOdata from '../../../../api/odata/productApiOdata';
import { Box, Grid, Typography } from '@mui/material';
import './style.scss';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import dateFormat from "dateformat";
import categoryApiOdata from '../../../../api/odata/categoryApiOdata';

Order.propTypes = {
    order: PropTypes.object
};

function Order(props) {

    const { order } = props;

    const [product, setProduct] = useState({});
    const [category, setCategory] = useState('');
    const [serviceOrder, setServiceOrder] = useState({});
    const [service, setService] = useState({});

    const history = useHistory();

    useEffect(() => {
        (async () => {
            try {
                if (order.Type === 'scheduler') {
                    const response = await serviceSchedulerApiOdata.get({
                        $filter: `ItemId eq '${order.ItemId}'`
                    });
                    setServiceOrder(response.value[0]);

                    const serviceOfSchedule = response.value[0];
                    if (serviceOfSchedule) {
                        const find = await serviceApiOdata.get({
                            $filter: `ServiceId eq '${serviceOfSchedule.ServiceId}'`
                        });
                        setService(find.value[0]);
                    }
                }
                else if (order.Type === 'product') {
                    const productFind = await productApiOdata.get({
                        $filter: `ItemId eq '${order.ItemId}'`
                    });
                    setProduct(productFind.value[0]);
                    const pFind = productFind.value[0];
                    if (pFind) {
                        const categoryFind = await categoryApiOdata.getAll({
                            $filter: `CategoryId eq ${pFind.CategoryId}`
                        });
                        setCategory(categoryFind.value[0].CategoryName)
                    }
                }

            } catch (error) {
                console.log("Something went wrong", error);
            }
        })();
    }, [order.ItemId, order.Type]);

    const handleServiceClick = () => {
        history.push(`/feeds/post/${service.PostId}`);
    };

    const handleProductClick = () => {
        history.push(`/feeds/post/${product.PostId}`);
    };

    return (
        <Box className='orderItemDiv'>
            {order.Type === 'scheduler' && (
                <>
                    <Box className='orderItemDiv__dt'>
                        <Grid container>
                            <Grid item md={2} lg={2}>
                                <Box className='orderItemDiv__dt__img' onClick={handleServiceClick}>
                                    <img
                                        src={service.ImageLink}
                                        alt=""
                                    />
                                </Box>
                            </Grid>
                            <Grid item md={10} lg={10}>
                                <Typography variant='h6' style={{ fontWeight: '500' }}>{service.ServiceName}</Typography>
                                <Typography className='cartItemDiv__date'>
                                    {dateFormat(serviceOrder.StartDate, "dd/mm/yyyy HH:MM:ss")} - {dateFormat(serviceOrder.EndDate, "dd/mm/yyyy HH:MM:ss")}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </>
            )}
            {order.Type === 'product' && (
                <>
                    <Box className='orderItemDiv__dt'>
                        <Grid container>
                            <Grid item md={2} lg={2}>
                                <Box className='orderItemDiv__dt__img' onClick={handleProductClick}>
                                    <img
                                        src={product.ImageLink}
                                        alt=""
                                    />
                                </Box>
                            </Grid>
                            <Grid item md={10} lg={10}>
                                <Typography variant='h6' style={{ fontWeight: '500' }}>{product.ProductName}</Typography>
                                <Typography className='cate'>{category}</Typography>
                                <Typography className='des'>{product.Description}</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </>
            )}
        </Box>
    );
}

export default Order;
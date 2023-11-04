import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import serviceApiOdata from '../../../api/odata/serviceApiOdata';
import { Box, Grid, Typography } from '@mui/material';
import dateFormat from "dateformat";
import { formatPrice } from '../../../utils';

CartItem.propTypes = {
    item: PropTypes.object
};

function CartItem(props) {

    const { item } = props;
    const [serviceItem, setServiceItem] = useState({});
    const history = useHistory();

    useEffect(() => {
        (async () => {
            if ((item.id).startsWith("IT")) {
                //console.log("Yes");
                const response = await serviceApiOdata.get({
                    $expand: 'ServiceSchedulers',
                    $filter: `ServiceId eq '${item.cartItem.ServiceId}'`
                });
                //console.log(response);
                setServiceItem(response.value[0]);
            }
        })()
    }, [item.id, item.cartItem.ServiceId]);

    const handleServiceClick = () => {
        history.push(`/feeds/post/${serviceItem.PostId}`);
    };

    const handleProductClick = () => {
        history.push(`/feeds/post/${item.item.PostId}`);
    };


    return (
        <Box className='cartItemDiv' >
            <Grid container>
                <Grid item md={2} lg={2}>
                    {(item.id).startsWith("IT") && (
                        <Box className='cartItemDiv__img' onClick={handleServiceClick}>
                            <img
                                src={serviceItem.ImageLink}
                                alt=""
                            />
                        </Box>
                    )}
                    {(item.id).startsWith("PD") && (
                        <Box className='cartItemDiv__img' onClick={handleProductClick}>
                            <img
                                src={item.cartItem.ImageLink}
                                alt=""
                            />
                        </Box>
                    )}
                </Grid>
                <Grid item md={10} lg={10}>
                    {(item.id).startsWith("IT") && (
                        <Box>
                            <Grid container>
                                <Grid item md={10} lg={10}>
                                    <Typography variant='h6' style={{ fontWeight: '500' }}>{serviceItem.ServiceName}</Typography>
                                    <Typography className='cartItemDiv__date'>
                                        {dateFormat(item.cartItem.StartDate, "dd/mm/yyyy HH:MM:ss")} - {dateFormat(item.cartItem.EndDate, "dd/mm/yyyy HH:MM:ss")}
                                    </Typography>
                                </Grid>
                                <Grid item md={2} lg={2} style={{
                                    display: "flex",
                                    justifyContent: "flex-end"
                                }}>
                                    <Typography className='cartItemDiv__price1'>
                                        {formatPrice(item.cartItem.Price)}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                    {(item.id).startsWith("PD") && (
                        <Box>
                            <Grid container>
                                <Grid item md={10} lg={10}>
                                    <Typography variant='h6' style={{ fontWeight: '500' }}>{item.cartItem.ProductName}</Typography>
                                </Grid>
                                <Grid item md={2} lg={2} style={{
                                    display: "flex",
                                    justifyContent: "flex-end"
                                }}>
                                    <Typography className='cartItemDiv__price1'>
                                        {formatPrice(item.cartItem.Price)}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
}

export default CartItem;
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import serviceApiOdata from '../../../../api/odata/serviceApiOdata';
import { Box, Grid, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch } from 'react-redux';
import { formatPrice } from '../../../../utils';
import dateFormat from "dateformat";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { removeFromCart } from '../../cartSlice';

CartItem.propTypes = {
    item: PropTypes.object
};

function CartItem(props) {

    const { item } = props;
    const [serviceItem, setServiceItem] = useState({});
    const history = useHistory();
    const dispatch = useDispatch();

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
        history.push(`/feeds/post/${item.cartItem.PostId}`);
    };

    const handleCancel = async () => {
        const action = removeFromCart({
            idNeedToRemove: item.id,
        });
        await dispatch(action);
        window.location.reload();
    }

    return (
        <Box className='cartItemDiv' >
            <Grid container>
                <Grid item md={3} lg={3}>
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
                <Grid item md={8} lg={8}>
                    {(item.id).startsWith("IT") && (
                        <Box>
                            <Typography variant='h6' style={{ fontWeight: '500' }}>{serviceItem.ServiceName}</Typography>
                            <Typography className='cartItemDiv__date'>
                                {dateFormat(item.cartItem.StartDate, "dd/mm/yyyy HH:MM:ss")} - {dateFormat(item.cartItem.EndDate, "dd/mm/yyyy HH:MM:ss")}
                            </Typography>
                            <Typography className='cartItemDiv__price'>
                                {formatPrice(item.cartItem.Price)}
                            </Typography>

                        </Box>
                    )}
                    {(item.id).startsWith("PD") && (
                        <Box>
                            <Typography variant='h6' style={{ fontWeight: '500' }}>{item.cartItem.ProductName}</Typography>
                            <Typography className='cartItemDiv__price'>
                                {formatPrice(item.cartItem.Price)}
                            </Typography>
                        </Box>
                    )}
                </Grid>
                <Grid item md={1} lg={1} style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Box style={{
                        cursor: 'pointer',
                    }}
                        onClick={handleCancel}>
                        <RemoveCircleIcon fontSize='large' color='error' />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default CartItem;
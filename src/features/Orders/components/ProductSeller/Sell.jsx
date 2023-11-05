import { Box, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import orderApiOdata from '../../../../api/odata/orderApiOdata';
import serviceApiOdata from '../../../../api/odata/serviceApiOdata';
import userAPIv2 from '../../../../api/userApiv2';
import dateFormat from "dateformat";
import categoryApiOdata from '../../../../api/odata/categoryApiOdata';

Sell.propTypes = {
    item: PropTypes.object
};

function Sell(props) {

    const { item } = props;

    const [service, setService] = useState({});
    const [owner, setOwner] = useState({});
    const [category, setCategory] = useState('');

    const history = useHistory();

    useEffect(() => {
        (async () => {
            try {
                if (item.type === 'scheduler') {
                    const response = await serviceApiOdata.get({
                        $filter: `ServiceId eq '${item.item.serviceScheduler.serviceId}'`
                    });
                    setService(response.value[0]);
                }
                else if (item.type === 'product') {
                    const pFind = item.item.product.categoryId;
                    const categoryFind = await categoryApiOdata.getAll({
                        $filter: `CategoryId eq ${pFind}`
                    });
                    setCategory(categoryFind.value[0].CategoryName);
                }

                const find = await orderApiOdata.get({
                    $filter: `OrderId eq ${item.orderId}`
                });
                const findOrder = find.value[0];
                const userFind = await userAPIv2.get(findOrder.AccountId);
                setOwner(userFind);

            } catch (error) {
                console.log("Something went wrong", error);
            }
        })();
    }, [item.item.product, item.item.serviceScheduler, item.orderId, item.type]);

    const handleProfileClick = () => {
        history.push(`/profile/${owner.accountId}`);
    }

    return (
        <Box className='orderItemDiv'>
            {item.type === 'scheduler' && (
                <>
                    <Box className='orderItemDiv__dt'>
                        <Grid container>
                            <Grid item md={2} lg={2}>
                                <Box className='orderItemDiv__dt__img'>
                                    <img
                                        src={service.ImageLink}
                                        alt=""
                                    />
                                </Box>
                            </Grid>
                            <Grid item md={6} lg={6}>
                                <Typography variant='h6' style={{ fontWeight: '500' }}>{service.ServiceName}</Typography>
                                <Typography className='cartItemDiv__date'>
                                    {dateFormat(item.item.serviceScheduler.startDate, "dd/mm/yyyy HH:MM:ss")} - {dateFormat(item.item.serviceScheduler.endDate, "dd/mm/yyyy HH:MM:ss")}
                                </Typography>
                            </Grid>
                            <Grid item md={4} lg={4}>
                                <Box onClick={handleProfileClick} className='inlineDiv'>
                                    <Grid container spacing={6}>
                                        <Grid item md={2} lg={2}>
                                            <Box className='imgDiv' style={{
                                                cursor: 'pointer'
                                            }}>
                                                <img
                                                    src={owner.avatarLink ? owner.avatarLink : 'https://firebasestorage.googleapis.com/v0/b/voicespire-7162e.appspot.com/o/imgs%2F20231025013807461.png?alt=media&token=209b22c7-c184-48e9-8ce0-c657c5f66182'}
                                                    alt=""
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item md={10} lg={10} className='nameDiv'>
                                            <Typography className='name'>{owner.fullName}</Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </>
            )}
            {item.type === 'product' && (
                <>
                    <Box className='orderItemDiv__dt'>
                        <Grid container>
                            <Grid item md={2} lg={2}>
                                <Box className='orderItemDiv__dt__img'>
                                    <img
                                        src={item.item.product.imageLink}
                                        alt=""
                                    />
                                </Box>
                            </Grid>
                            <Grid item md={6} lg={6}>
                                <Typography variant='h6' style={{ fontWeight: '500' }}>{item.item.product.productName}</Typography>
                                <Typography className='cate'>{category}</Typography>
                                <Typography className='des'>{item.item.product.description}</Typography>
                            </Grid>
                            <Grid item md={4} lg={4}>
                                <Box className='inlineDiv'>
                                    <Grid container spacing={6}>
                                        <Grid item md={2} lg={2}>
                                            <Box className='imgDiv'>
                                                <img
                                                    src={owner.avatarLink ? owner.avatarLink : 'https://firebasestorage.googleapis.com/v0/b/voicespire-7162e.appspot.com/o/imgs%2F20231025013807461.png?alt=media&token=209b22c7-c184-48e9-8ce0-c657c5f66182'}
                                                    alt=""
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item md={10} lg={10} className='nameDiv'>
                                            <Typography className='name' onClick={handleProfileClick}>{owner.fullName}</Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </>
            )}
        </Box>
    );
}

export default Sell;
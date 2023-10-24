import { Box, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromPackage } from '../AddGift/giftSlice';
import CancelGift from './CancelGift';
import './style.scss';

Gift.propTypes = {
    gift: PropTypes.object,
};

function Gift(props) {

    const { gift } = props;
    const dispatch = useDispatch();

    const handleCancel = () => {
        const action = removeFromPackage({
            removeGift: gift.giftName,
        });
        dispatch(action);
        //window.location.reload();
    }

    return (
        <Box className='giftDiv'>
            <Grid container columns={{ md: 11, lg: 11 }}>
                <Grid item md={3} lg={3}>
                    <Box className='giftDiv__img'>
                        <img src={gift.imageLink} alt="" width='80%' />
                    </Box>
                </Grid>
                <Grid item md={7} lg={7} className='giftTitle'>
                    <Box>
                        <Typography className='giftTitle__name'>{gift.giftName}</Typography>
                        <Typography className='giftTitle__des'>{gift.description}</Typography>
                    </Box>
                </Grid>
                <Grid item md={1} lg={1} className='cancelDiv'>
                    <Box className='cancelBtnDiv'>
                        <CancelGift onSubmit={handleCancel} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Gift;
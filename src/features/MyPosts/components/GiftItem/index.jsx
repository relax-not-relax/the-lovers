import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@mui/material';

GiftItem.propTypes = {
    item: PropTypes.object,
};

function GiftItem(props) {

    const { item } = props;

    return (
        <Box className='giftItemDiv'>
            <Grid container spacing={2}>
                <Grid item>
                    <Box className='imgDiv'>
                        <img
                            src={item.ImageLink ? item.ImageLink : 'https://firebasestorage.googleapis.com/v0/b/voicespire-7162e.appspot.com/o/imgs%2F20231026041138330.png?alt=media&token=71652d27-f825-4013-9a03-43bb568dfdbb'}
                            alt=""
                        />
                    </Box>
                </Grid>
                <Grid item className='nameDiv'>
                    <Typography className='name'>{item.GiftName}</Typography>
                </Grid>
            </Grid>

            <Typography className='des'>
                {item.Description}
            </Typography>

        </Box>
    );
}

export default GiftItem;
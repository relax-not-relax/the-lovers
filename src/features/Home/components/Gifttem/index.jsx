import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@mui/material';
import './style.scss'
import Comment from '../PostItem/Comment';

GiftItem.propTypes = {
    item: PropTypes.object,
    cmOwnerId: PropTypes.number,
    onClick: PropTypes.func,
};

function GiftItem(props) {

    const { item, cmOwnerId, onClick } = props;

    return (
        <Box>
            {item.Status === true && (
                <>
                    <Box className='giftItemDiv'>
                        <Grid container spacing={2} onClick={onClick} style={{ cursor: 'pointer' }}>
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

                        <Comment giftId={item.GiftId} accountId={cmOwnerId} />

                    </Box>
                </>
            )}

        </Box>

    );
}

export default GiftItem;
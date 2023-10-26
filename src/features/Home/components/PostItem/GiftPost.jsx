import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@mui/material';
import './style.scss';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Comment from './Comment';
import { useState } from 'react';
import { useEffect } from 'react';
import GiftItem from '../Gifttem';

dayjs.extend(relativeTime)

GiftPost.propTypes = {
    giftPost: PropTypes.object,
    userId: PropTypes.number,
};

function GiftPost(props) {

    const { giftPost, userId } = props;

    const [giftList, setGiftList] = useState([]);

    useEffect(() => {
        setGiftList(giftPost.Gifts);
    }, [giftPost.Gifts]);



    return (
        <Box className='giftPostCtn'>
            <Box className='giftPostDiv'>
                <Grid container spacing={2}>
                    <Grid item>
                        <Box className='imgDiv'>
                            <img
                                src={giftPost.Owner.AvatarLink ? giftPost.Owner.AvatarLink : 'https://firebasestorage.googleapis.com/v0/b/voicespire-7162e.appspot.com/o/imgs%2F20231025013807461.png?alt=media&token=209b22c7-c184-48e9-8ce0-c657c5f66182'}
                                alt=""
                            />
                        </Box>
                    </Grid>
                    <Grid item className='title'>
                        <Box>
                            <Typography className='userName'>
                                {giftPost.Owner.FullName}
                            </Typography>
                            <Typography className='createAt'>
                                {dayjs(giftPost.CreateDate).fromNow()}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                <Box marginTop={2} className='content'>
                    <Typography className='header'>
                        {giftPost.Title}
                    </Typography>
                    <Typography className='detail'>
                        {giftPost.Content}
                    </Typography>
                </Box>

                <Box marginTop={5}>
                    {giftList.map((gift) => (
                        <Box key={gift.GiftId}>
                            <GiftItem item={gift} cmOwnerId={userId} />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}

export default GiftPost;
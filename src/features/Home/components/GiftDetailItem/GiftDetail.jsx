import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import commentApiOdata from '../../../../api/odata/commentApiOdata';
import { Box, Grid, Typography } from '@mui/material';
import CommentDetail from './CommentDetail';
import Comment from './Comment';

GiftDetail.propTypes = {
    gift: PropTypes.object
};

function GiftDetail(props) {

    const { gift } = props;

    const [commentList, setCommentList] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await commentApiOdata.get({
                    $filter: `GiftId eq '${gift.GiftId}'`,
                });
                setCommentList(response.value);
            } catch (error) {
                console.log('Failed to get comments', error);
            }
        })()
    }, [gift.GiftId]);

    return (
        <Box className='giftDetailDiv'>
            <Box className='giftItemDiv'>
                <Grid container spacing={2}>
                    <Grid item>
                        <Box className='imgDiv'>
                            <img
                                src={gift.ImageLink ? gift.ImageLink : 'https://firebasestorage.googleapis.com/v0/b/voicespire-7162e.appspot.com/o/imgs%2F20231026041138330.png?alt=media&token=71652d27-f825-4013-9a03-43bb568dfdbb'}
                                alt=""
                            />
                        </Box>
                    </Grid>
                    <Grid item className='nameDiv'>
                        <Typography className='name'>{gift.GiftName}</Typography>
                    </Grid>
                </Grid>

                <Typography className='des'>
                    {gift.Description}
                </Typography>

                <Comment giftId={gift.GiftId} />

                {commentList.map((comment, idx) => (
                    <CommentDetail comment={comment} key={idx} />
                ))}

            </Box>
        </Box>
    );
}

export default GiftDetail;
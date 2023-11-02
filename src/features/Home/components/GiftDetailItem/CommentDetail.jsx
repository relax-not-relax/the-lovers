import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime)

CommentDetail.propTypes = {
    comment: PropTypes.object
};

function CommentDetail(props) {

    const { comment } = props;

    return (
        <Box className='commentDetail'>
            {comment.ApproveStatus === 'waiting' && (
                <>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Box className='imgDiv'>
                                <img
                                    src={comment.Account.ImageLink ? comment.Account.ImageLink : 'https://firebasestorage.googleapis.com/v0/b/voicespire-7162e.appspot.com/o/imgs%2F20231025013807461.png?alt=media&token=209b22c7-c184-48e9-8ce0-c657c5f66182'}
                                    alt=""
                                />
                            </Box>
                        </Grid>

                        <Grid item style={{
                            paddingTop: '25px'
                        }}>
                            <Box className='comment'>
                                <Typography style={{
                                    fontSize: '17px',
                                    fontWeight: '500',
                                    marginBottom: '10px'
                                }}>{comment.Account.FullName}</Typography>
                                <Typography style={{
                                    fontSize: '14px',
                                    color: '#000',
                                }}>{comment.Content}</Typography>
                                <Typography style={{
                                    marginTop: '10px',
                                    fontSize: '13px',
                                    color: '#ccc'
                                }}>
                                    {dayjs(comment.CreateDate).fromNow()}
                                </Typography>
                            </Box>
                        </Grid>

                    </Grid>
                </>
            )}
        </Box>
    );
}

export default CommentDetail;
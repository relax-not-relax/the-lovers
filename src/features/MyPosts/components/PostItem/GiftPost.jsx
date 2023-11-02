import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';
import { useEffect } from 'react';
import reactApiOdata from '../../../../api/odata/reactApiOdata';
import { Box, Grid, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GiftItem from '../GiftItem';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

dayjs.extend(relativeTime)

GiftPost.propTypes = {
    giftPost: PropTypes.object,
    userId: PropTypes.number,
};

function GiftPost(props) {

    const { giftPost, userId } = props;
    const history = useHistory();

    const [giftList, setGiftList] = useState([]);
    const [changeColor, setChangeColor] = useState(false);
    const [reactAmount, setReactAmount] = useState(0);

    useEffect(() => {
        (async () => {
            if (giftPost.Reacted !== true) {
                setChangeColor(false);
            } else if (giftPost.Reacted === true) {
                setChangeColor(true);
            }
            try {
                const params = {
                    $filter: `PostId eq ${giftPost.PostId}`
                };
                const response = await reactApiOdata.count(params);
                setReactAmount(response);
            } catch (error) {
                console.log('Failed to load number of reacts', error);
            }
            //console.log(giftPost.Reacted);
            setGiftList(giftPost.Gifts);
        })();
    }, [giftPost.Gifts, giftPost.PostId, giftPost.Reacted]);

    const handleOnChange = async () => {
        setChangeColor(!changeColor);
        try {
            const request = {
                "accountId": userId,
                "postId": giftPost.PostId,
                "reactTypeId": 1,
                "reactType": null
            }

            //console.log(request);
            const response = await reactApiOdata.post(request);
            //console.log(response);

            if (response === 'Reacted') {
                setReactAmount(reactAmount + 1);
            } else if (response === 'Unreacted') {
                setReactAmount(reactAmount - 1);
            }

        } catch (error) {
            console.log('Failed to react this post', error);
        }
    }

    const handlePostClick = () => {
        history.push(`/posts/post/${giftPost.PostId}`)
    }

    return (
        <Box className='giftPostCtn'>
            <Box className='giftPostDiv'>
                <Grid container spacing={2}>
                    <Grid item md={1} lg={1}>
                        <Box className='imgDiv'>
                            <img
                                src={giftPost.Owner.AvatarLink ? giftPost.Owner.AvatarLink : 'https://firebasestorage.googleapis.com/v0/b/voicespire-7162e.appspot.com/o/imgs%2F20231025013807461.png?alt=media&token=209b22c7-c184-48e9-8ce0-c657c5f66182'}
                                alt=""
                            />
                        </Box>
                    </Grid>
                    <Grid item className='title' md={9} lg={9}>
                        <Box>
                            <Typography className='userName'>
                                {giftPost.Owner.FullName}
                            </Typography>
                            <Typography className='createAt'>
                                {dayjs(giftPost.CreateDate).fromNow()}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item className='reaction' md={2} lg={2}>
                        <Box style={{
                            display: 'flex',
                        }}>
                            <FavoriteIcon fontSize='large' className={`${(changeColor === true) ? 'active' : 'notActive'}`} onClick={handleOnChange} style={{ cursor: 'pointer' }} />
                            <Typography style={{
                                paddingTop: '5px',
                                paddingLeft: '5px',
                            }}>
                                {reactAmount} like
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

                <Box marginTop={5} onClick={handlePostClick}>
                    {giftList.map((gift) => (
                        <Box key={gift.GiftId}>
                            <GiftItem item={gift} />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}

export default GiftPost;
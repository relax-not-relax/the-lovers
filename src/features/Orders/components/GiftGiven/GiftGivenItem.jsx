import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import StorageKeys from '../../../../constants/storage-keys';
import { useState } from 'react';
import postApiOdata from '../../../../api/odata/postApiOdata';
import './style.scss';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

GiftGivenItem.propTypes = {
    item: PropTypes.object,
};

function GiftGivenItem(props) {

    const { item } = props;
    const [belongComment, setBelongComment] = useState({});
    const [author, setAuthor] = useState({});
    const [owner, setOwner] = useState({});
    const history = useHistory();

    useEffect(() => {
        (async () => {
            const userDataFromLocalStorage = localStorage.getItem(StorageKeys.USER);
            if (userDataFromLocalStorage) {
                const parsedUserData = JSON.parse(userDataFromLocalStorage);
                if (parsedUserData) {
                    setOwner(parsedUserData);
                    const find = item.giftComments.find(giftComment => giftComment.accountId === parsedUserData.accountId);
                    setBelongComment(find);

                    const response = await postApiOdata.get({
                        $filter: `PostId eq ${item.postId}`
                    });
                    //console.log(response);
                    setAuthor(response.value[0].Owner);
                }
            }
        })();
    }, [item.giftComments, item.postId]);

    const handleProfileClick = () => {
        history.push(`/profile/${author.AccountId}`)
    }

    return (
        <Box>
            {belongComment.approveStatus === 'accept' && (
                <>
                    <Box className='giftGivenDiv'>
                        <Grid container>
                            <Grid item md={1} lg={1}>
                                <Box className='ownerDiv'>
                                    <img
                                        src={owner.avatarLink ? owner.avatarLink : 'https://firebasestorage.googleapis.com/v0/b/voicespire-7162e.appspot.com/o/imgs%2F20231025013807461.png?alt=media&token=209b22c7-c184-48e9-8ce0-c657c5f66182'}
                                        alt=""
                                    />
                                </Box>
                            </Grid>
                            <Grid item md={10} lg={10} className='contentDiv'>
                                <Typography className='content'>"{belongComment.content}"</Typography>
                            </Grid>
                        </Grid>
                        <Box className='giftDetail'>
                            <Grid container>
                                <Grid item md={2} lg={2}>
                                    <Box className='imageDiv'>
                                        <img
                                            src={item.imageLink}
                                            alt=""
                                        />
                                    </Box>
                                </Grid>
                                <Grid item md={10} lg={10} paddingLeft={5} style={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center'
                                }}>
                                    <Box>
                                        <Typography className='title'>{item.giftName}</Typography>
                                        <Typography className='des'>{item.description}</Typography>
                                        <Box>
                                            <Grid container marginTop={2}>
                                                <Grid item md={3} lg={3}>
                                                    <Box className='authorDiv'>
                                                        <img
                                                            src={author.AvatarLink ? author.AvatarLink : 'https://firebasestorage.googleapis.com/v0/b/voicespire-7162e.appspot.com/o/imgs%2F20231025013807461.png?alt=media&token=209b22c7-c184-48e9-8ce0-c657c5f66182'}
                                                            alt=""
                                                        />
                                                    </Box>
                                                </Grid>
                                                <Grid item md={9} lg={9} className='nameDiv' onClick={handleProfileClick}>
                                                    <Typography className='name'>{author.FullName}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>

                                    </Box>

                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </>
            )
            }
        </Box >
    );
}

export default GiftGivenItem;
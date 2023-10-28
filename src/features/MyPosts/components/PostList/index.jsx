import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StorageKeys from '../../../../constants/storage-keys';
import { Box } from '@mui/system';
import ProductPost from '../../../Home/components/PostItem/ProductPost';
import ServicePost from '../../../Home/components/PostItem/ServicePost';
import GiftPost from '../PostItem/GiftPost';
import { Button, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

PostList.propTypes = {
    data: PropTypes.array,
};

PostList.defaultProps = {
    data: [],
};

function PostList(props) {

    const { data } = props;

    const [loginUser, setLoginUser] = useState({});

    useEffect(() => {
        const userData = localStorage.getItem(StorageKeys.USER);

        if (userData) {
            const parsedUserData = JSON.parse(userData);
            setLoginUser(parsedUserData);
        }
    }, []);

    const history = useHistory();

    const handleCreate = () => {
        history.push('/create');
    }

    return (
        <Box>
            {data.map((post) => (
                <Box key={post.PostId}>
                    {(post.Type === 'gift') && (
                        <>
                            <GiftPost giftPost={post} userId={loginUser.accountId} />
                        </>
                    )}

                    {(post.Type === 'product') && (
                        <>
                            <ProductPost productPost={post} userId={loginUser.accountId} />
                        </>
                    )}

                    {(post.Type === 'service') && (
                        <>
                            <ServicePost servicePost={post} service={post.Services[0]} userId={loginUser.accountId} />
                        </>
                    )}
                </Box>
            ))}
            {data.length === 0 && (
                <>
                    <Box>
                        <Typography style={{
                            textAlign: 'center',
                            marginBottom: '20px'
                        }}>
                            Look like Your Posts is empty!
                        </Typography>
                        <Box style={{
                            margin: '0 300px'
                        }}>
                            <Button fullWidth variant='contained' style={{
                                padding: '15px 0',
                                borderRadius: '30px',
                                backgroundColor: '#132043'
                            }} onClick={handleCreate}>
                                Add new post
                            </Button>
                        </Box>

                    </Box>
                </>
            )}
        </Box>

    );
}

export default PostList;
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import GiftPost from '../PostItem/GiftPost';
import StorageKeys from '../../../../constants/storage-keys';
import ProductPost from '../PostItem/ProductPost';
import ServicePost from '../PostItem/ServicePost';

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

    return (
        <Box>
            {data.map((post) => (
                <Box key={post.PostId}>
                    {(post.Type === 'gift' && loginUser.accountId !== post.OwnerId && post.Status === true) && (
                        <>
                            <GiftPost giftPost={post} userId={loginUser.accountId} />
                        </>
                    )}

                    {(post.Type === 'product' && loginUser.accountId !== post.OwnerId && post.Status === true) && (
                        <>
                            <ProductPost productPost={post} userId={loginUser.accountId} />
                        </>
                    )}

                    {(post.Type === 'service' && loginUser.accountId !== post.OwnerId && post.Status === true) && (
                        <>
                            <ServicePost servicePost={post} service={post.Services[0]} userId={loginUser.accountId} />
                        </>
                    )}
                </Box>
            ))}
        </Box>
    );
}

export default PostList;
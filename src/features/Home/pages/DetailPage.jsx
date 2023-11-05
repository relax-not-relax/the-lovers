import React from 'react';
//import PropTypes from 'prop-types';
import { Box, LinearProgress, Typography } from '@mui/material';
import { useHistory, useRouteMatch } from 'react-router-dom/cjs/react-router-dom';
import '../style.scss';
import usePostDetail from '../hooks/usePostDetail';
import dateFormat from "dateformat";
import GiftList from '../components/GiftDetailItem/GiftList';
import ProductList from '../components/ProductDetailItem/ProductList';
import ServiceList from '../components/ServiceDetailItem/ServiceList';

DetailPage.propTypes = {

};

function DetailPage(props) {

    const {
        params: { postId },

    } = useRouteMatch();
    const history = useHistory();

    const { post, loading } = usePostDetail(postId);

    if (loading) {
        return <Box className="loading">
            <LinearProgress />
        </Box>
    }

    const handleUserClick = () => {
        history.push(`/profile/${post.Owner.AccountId}`);
    }

    return (
        <Box className='postDetailSection'>
            <Typography className='title'>{post.Title}</Typography>
            <Typography className='date'>{dateFormat(post.CreateDate, "dd-mm-yyyy HH:MM:ss")}</Typography>
            <p style={{
                margin: '0',
                fontSize: '15px'
            }} className='authorName' onClick={handleUserClick}>
                <span style={{
                    fontWeight: 500,
                }}>Author:
                </span> {post.Owner.FullName}
            </p>
            <Typography className='content'>{post.Content}</Typography>

            {post.Type === 'gift' && (
                <GiftList giftList={post.Gifts} />
            )}

            {post.Type === 'product' && (
                <ProductList productList={post.Products} />
            )}

            {post.Type === 'service' && (
                <ServiceList service={post.Services[0]} />
            )}
        </Box>

    );
}

export default DetailPage;
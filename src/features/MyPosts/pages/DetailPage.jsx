import { Box, LinearProgress, Typography } from '@mui/material';
import dateFormat from "dateformat";
import React from 'react';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom';
import usePostDetail from '../../Home/hooks/usePostDetail';
import GiftList from '../components/GiftDetailItem/GiftList';
import '../style.scss';

DetailPage.propTypes = {

};

function DetailPage(props) {

    const {
        params: { postId },

    } = useRouteMatch();

    const { post, loading } = usePostDetail(postId);

    if (loading) {
        return <Box className="loading">
            <LinearProgress />
        </Box>
    }

    return (
        <Box className='postDetailSection'>
            <Typography className='title'>{post.Title}</Typography>
            <Typography className='date'>{dateFormat(post.CreateDate, "dd-mm-yyyy HH:MM:ss")}</Typography>
            <p style={{
                margin: '0',
                fontSize: '15px'
            }}><span style={{
                fontWeight: 500,
            }}>Author: </span>{post.Owner.FullName}</p>
            <Typography className='content'>{post.Content}</Typography>

            {post.Type === 'gift' && (
                <GiftList giftList={post.Gifts} />
            )}
        </Box>
    );
}

export default DetailPage;
import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ProductItem from '../ProductItem';
import FavoriteIcon from '@mui/icons-material/Favorite';
import reactApiOdata from '../../../../api/odata/reactApiOdata';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

dayjs.extend(relativeTime);

ProductPost.propTypes = {
    productPost: PropTypes.object,
    userId: PropTypes.number,
};

function ProductPost(props) {

    const { productPost, userId } = props;
    const history = useHistory();

    const [productList, setProductList] = useState([]);
    const [changeColor, setChangeColor] = useState(false);
    const [reactAmount, setReactAmount] = useState(0);

    useEffect(() => {
        (async () => {
            if (productPost.Reacted !== true) {
                setChangeColor(false);
            } else if (productPost.Reacted === true) {
                setChangeColor(true);
            }
            try {
                const params = {
                    $filter: `PostId eq ${productPost.PostId}`
                };
                const response = await reactApiOdata.count(params);
                setReactAmount(response);
            } catch (error) {
                console.log('Failed to load number of reacts', error);
            }
            //console.log(productPost.Reacted);
            setProductList(productPost.Products);
        })();
    }, [productPost.Products, productPost.PostId, productPost.Reacted]);

    const handleOnChange = async () => {
        setChangeColor(!changeColor);
        try {
            const request = {
                "accountId": userId,
                "postId": productPost.PostId,
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
        history.push(`/feeds/post/${productPost.PostId}`)
    }

    const handleProfileClick = () => {
        history.push(`/profile/${productPost.Owner.AccountId}`)
    }

    return (
        <div>
            <Box className='productPostCtn'>
                <Box className='productPostDiv'>
                    <Grid container spacing={2}>
                        <Grid item md={1} lg={1}>
                            <Box className='imgDiv' onClick={handleProfileClick} style={{
                                cursor: 'pointer'
                            }}>
                                <img
                                    src={productPost.Owner.AvatarLink ? productPost.Owner.AvatarLink : 'https://firebasestorage.googleapis.com/v0/b/voicespire-7162e.appspot.com/o/imgs%2F20231025013807461.png?alt=media&token=209b22c7-c184-48e9-8ce0-c657c5f66182'}
                                    alt=""
                                />
                            </Box>
                        </Grid>
                        <Grid item className='title' md={9} lg={9}>
                            <Box>
                                <Typography className='userName'>
                                    {productPost.Owner.FullName}
                                </Typography>
                                <Typography className='createAt'>
                                    {dayjs(productPost.CreateDate).fromNow()}
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
                            {productPost.Title}
                        </Typography>
                        <Typography className='detail'>
                            {productPost.Content}
                        </Typography>
                    </Box>

                    {productPost.OwnerId === userId && (
                        <>
                            <Box marginTop={5}>
                                <Grid container spacing={1}>
                                    {productList.map((product) => (
                                        <Grid item key={product.ProductId} md={4} lg={4}>
                                            <ProductItem item={product} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </>
                    )}

                    {productPost.OwnerId !== userId && (
                        <>
                            <Box marginTop={5} onClick={handlePostClick} style={{
                                cursor: 'pointer'
                            }}>
                                <Grid container spacing={1}>
                                    {productList.map((product) => (
                                        <Grid item key={product.ProductId} md={4} lg={4}>
                                            <ProductItem item={product} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </>
                    )}

                </Box>
            </Box>
        </div>
    );
}

export default ProductPost;
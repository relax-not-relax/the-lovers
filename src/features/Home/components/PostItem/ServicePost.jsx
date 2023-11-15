import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import serviceApiOdata from '../../../../api/odata/serviceApiOdata';
import { Box, Button, Dialog, DialogActions, DialogContent, Grid, IconButton, LinearProgress, Menu, MenuItem, Typography } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ServiceItem from '../../../Home/components/ServiceItem';
import reactApiOdata from '../../../../api/odata/reactApiOdata';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import postAPI from '../../../../api/postApi';

dayjs.extend(relativeTime);

ServicePost.propTypes = {
    servicePost: PropTypes.object,
    service: PropTypes.object,
    userId: PropTypes.number,
};

function ServicePost(props) {

    const { servicePost, service, userId } = props;
    const history = useHistory();

    const [serviceItem, setServiceItem] = useState({});
    const [scheduleList, setScheduleList] = useState([]);
    const [changeColor, setChangeColor] = useState(false);
    const [reactAmount, setReactAmount] = useState(0);

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const response = await serviceApiOdata.get({
                    $expand: 'ServiceSchedulers',
                    $filter: `ServiceId eq '${service.ServiceId}'`,
                });
                setServiceItem(response.value[0]);
                setScheduleList(response.value[0].ServiceSchedulers);
            } catch (error) {
                console.log('Failed to get service', error);
            }
        })()
    }, [service.ServiceId]);

    useEffect(() => {
        (async () => {
            if (servicePost.Reacted !== true) {
                setChangeColor(false);
            } else if (servicePost.Reacted === true) {
                setChangeColor(true);
            }
            try {
                const params = {
                    $filter: `PostId eq ${servicePost.PostId}`
                };
                const response = await reactApiOdata.count(params);
                setReactAmount(response);
            } catch (error) {
                console.log('Failed to load number of reacts', error);
            }

        })();
    }, [servicePost.PostId, servicePost.Reacted]);

    const handleOnChange = async () => {
        setChangeColor(!changeColor);
        try {
            const request = {
                "accountId": userId,
                "postId": servicePost.PostId,
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
        history.push(`/feeds/post/${servicePost.PostId}`)
    }

    const handleProfileClick = () => {
        history.push(`/profile/${servicePost.Owner.AccountId}`)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setAnchorEl(null);
    };

    const handleOptionClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handlePostDelete = async () => {
        setLoading(true);
        try {
            //console.log(giftPost.PostId);
            await postAPI.remove(servicePost.PostId);
            setLoading(false);
            setOpen(false);
            setAnchorEl(null);
            window.location.reload();
        } catch (error) {
            console.log('Failed to delete post', error);
        }
    }

    return (
        <div>
            <Box className='servicePostCtn'>
                <Box className='servicePostDiv'>
                    <Grid container spacing={2}>
                        {servicePost.OwnerId !== userId && (
                            <>
                                <Grid item md={1} lg={1}>
                                    <Box className='imgDiv' onClick={handleProfileClick} style={{
                                        cursor: 'pointer'
                                    }}>
                                        <img
                                            src={servicePost.Owner.AvatarLink ? servicePost.Owner.AvatarLink : 'https://firebasestorage.googleapis.com/v0/b/voicespire-7162e.appspot.com/o/imgs%2F20231025013807461.png?alt=media&token=209b22c7-c184-48e9-8ce0-c657c5f66182'}
                                            alt=""
                                        />
                                    </Box>
                                </Grid>
                                <Grid item className='title' md={9} lg={9}>
                                    <Box>
                                        <Typography className='userName'>
                                            {servicePost.Owner.FullName}
                                        </Typography>
                                        <Typography className='createAt'>
                                            {dayjs(servicePost.CreateDate).fromNow()}
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
                            </>
                        )}

                        {servicePost.OwnerId === userId && (
                            <>
                                <Grid item md={1} lg={1}>
                                    <Box className='imgDiv' onClick={handleProfileClick} style={{
                                        cursor: 'pointer'
                                    }}>
                                        <img
                                            src={servicePost.Owner.AvatarLink ? servicePost.Owner.AvatarLink : 'https://firebasestorage.googleapis.com/v0/b/voicespire-7162e.appspot.com/o/imgs%2F20231025013807461.png?alt=media&token=209b22c7-c184-48e9-8ce0-c657c5f66182'}
                                            alt=""
                                        />
                                    </Box>
                                </Grid>
                                <Grid item className='title' md={8} lg={8}>
                                    <Box>
                                        <Typography className='userName'>
                                            {servicePost.Owner.FullName}
                                        </Typography>
                                        <Typography className='createAt'>
                                            {dayjs(servicePost.CreateDate).fromNow()}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item className='reaction' md={2} lg={2} style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
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
                                <Grid item md={1} lg={1} style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <IconButton color="inherit" onClick={handleOptionClick}>
                                        <MoreVertIcon />
                                    </IconButton>

                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleCloseMenu}
                                        PaperProps={{
                                            elevation: 0,
                                            sx: {
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.5,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                '&:before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            },
                                        }}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >
                                        <MenuItem onClick={handleClickOpen}>
                                            Delete Post
                                        </MenuItem>
                                    </Menu>

                                    <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                                        {loading && <LinearProgress />}
                                        <DialogContent>

                                            <Box className='deleteDiv'>

                                                <Typography className='header'>Delete Post</Typography>
                                                <Typography className='pag'>Are you sure you want to delete this post?</Typography>

                                                <Box style={{ padding: '0 30px', marginTop: '20px' }}>
                                                    <Button fullWidth variant='contained' className='deleteBtn' color='error' onClick={handlePostDelete}>
                                                        Delete
                                                    </Button>

                                                </Box>

                                            </Box>

                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose}>Cancel</Button>
                                        </DialogActions>
                                    </Dialog>
                                </Grid>
                            </>
                        )}
                    </Grid>

                    <Box marginTop={2} className='content'>
                        <Typography className='header'>
                            {servicePost.Title}
                        </Typography>
                        <Typography className='detail'>
                            {servicePost.Content}
                        </Typography>
                    </Box>

                    {servicePost.OwnerId !== userId && (
                        <>
                            <Box marginTop={5} onClick={handlePostClick} style={{
                                cursor: 'pointer'
                            }}>
                                <ServiceItem item={serviceItem} schedules={scheduleList} />
                            </Box>
                        </>
                    )}


                    {servicePost.OwnerId === userId && (
                        <>
                            <Box marginTop={5}>
                                <ServiceItem item={serviceItem} schedules={scheduleList} />
                            </Box>
                        </>
                    )}

                </Box>
            </Box>
        </div>
    );
}

export default ServicePost;
import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import serviceApiOdata from '../../../../api/odata/serviceApiOdata';
import { Box, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ServiceItem from '../../../Home/components/ServiceItem';
import reactApiOdata from '../../../../api/odata/reactApiOdata';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

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

    return (
        <div>
            <Box className='servicePostCtn'>
                <Box className='servicePostDiv'>
                    <Grid container spacing={2}>
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
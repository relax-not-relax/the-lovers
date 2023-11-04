import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import serviceApiOdata from '../../../../api/odata/serviceApiOdata';
import { Box, Button, Grid, Typography } from '@mui/material';
import dateFormat from "dateformat";
import { formatPrice } from '../../../../utils';
import { ShoppingCart } from '@mui/icons-material';
import ScheduleAdd from './ScheduleAdd';

ServiceList.propTypes = {
    service: PropTypes.object
};

function ServiceList(props) {

    const { service } = props;

    const [scheduleList, setScheduleList] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await serviceApiOdata.get({
                    $expand: 'ServiceSchedulers',
                    $filter: `ServiceId eq '${service.ServiceId}'`,
                });
                setScheduleList(response.value[0].ServiceSchedulers);
            } catch (error) {
                console.log('Failed to get service', error);
            }
        })()
    }, [service.ServiceId]);

    return (
        <Box className='serviceItemDiv'>
            <Grid container spacing={2}>
                <Grid item>
                    <Box className='imgDiv'>
                        <img
                            src={service.ImageLink ? service.ImageLink : 'https://firebasestorage.googleapis.com/v0/b/voicespire-7162e.appspot.com/o/imgs%2F20231026041138330.png?alt=media&token=71652d27-f825-4013-9a03-43bb568dfdbb'}
                            alt=""
                        />
                    </Box>
                </Grid>
                <Grid item className='nameDiv'>
                    <Box>
                        <Typography className='name'>{service.ServiceName}</Typography>
                        <Typography className='address'>{service.Address}</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Typography className='des'>
                {service.Description}
            </Typography>

            <Box marginTop={3} >
                <Grid container spacing={5}>
                    {scheduleList.map((schedule, idx) => (
                        <Grid item key={idx} md={6} lg={6}>
                            <Grid container>
                                <Grid item md={8} lg={8}>
                                    <Box className='scheduleDivItem__detail'>
                                        <p><span style={{ fontWeight: '500' }}>Start: </span>
                                            {dateFormat(schedule.StartDate, "dd-mm-yyyy HH:MM:ss")}
                                        </p>
                                        <p><span style={{ fontWeight: '500' }}>End: </span>
                                            {dateFormat(schedule.EndDate, "dd-mm-yyyy HH:MM:ss")}
                                        </p>
                                        <p className='price'><span style={{ fontWeight: '500' }}>Price: </span>
                                            {formatPrice(schedule.Price)}
                                        </p>
                                    </Box>
                                </Grid>

                                <Grid item md={4} lg={4} className='addToCartDiv'>
                                    {schedule.Status === true && (
                                        <>
                                            <ScheduleAdd schedule={schedule} />
                                        </>
                                    )}

                                </Grid>
                            </Grid>

                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}

export default ServiceList;
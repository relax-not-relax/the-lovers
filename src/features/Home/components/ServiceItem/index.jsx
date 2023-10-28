import { Box, Grid, Typography } from '@mui/material';
import dateFormat from "dateformat";
import PropTypes from 'prop-types';
import React from 'react';
import { formatPrice } from '../../../../utils';
import './style.scss';

index.propTypes = {
    item: PropTypes.object,
    schedules: PropTypes.array,
};

function index(props) {

    const { item, schedules } = props;

    return (
        <Box className='serviceItemDiv'>
            <Grid container spacing={2}>
                <Grid item>
                    <Box className='imgDiv'>
                        <img
                            src={item.ImageLink ? item.ImageLink : 'https://firebasestorage.googleapis.com/v0/b/voicespire-7162e.appspot.com/o/imgs%2F20231026041138330.png?alt=media&token=71652d27-f825-4013-9a03-43bb568dfdbb'}
                            alt=""
                        />
                    </Box>
                </Grid>
                <Grid item className='nameDiv'>
                    <Box>
                        <Typography className='name'>{item.ServiceName}</Typography>
                        <Typography className='address'>{item.Address}</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Typography className='des'>
                {item.Description}
            </Typography>

            <Box marginTop={3}>
                <Grid container spacing={2}>
                    {schedules.map((schedule, idx) => (
                        <Grid item key={idx} md={6} lg={6}>
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
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}

export default index;
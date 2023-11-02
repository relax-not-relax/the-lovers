import { Box, Grid } from '@mui/material';
import dateFormat from "dateformat";
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { formatPrice } from '../../../../utils';
import { removeServiceSchedule } from '../AddService/serviceSlice';
import CancelScheduleItem from './CancelScheduleItem';
import './style.scss';

ServiceSchedule.propTypes = {
    schedule: PropTypes.object,
    scheduleIndex: PropTypes.number,
};

function ServiceSchedule(props) {

    const { schedule, scheduleIndex } = props;

    const startDate = dateFormat(schedule.startDate);
    const endDate = dateFormat(schedule.endDate);

    const dispatch = useDispatch();

    const handleCancel = () => {
        const action = removeServiceSchedule({
            serviceIndex: 0,
            scheduleIndex: scheduleIndex,
        });
        dispatch(action);
        //window.location.reload();
    }

    return (
        <Box className='scheduleDiv'>
            <Grid container>
                <Grid item md={10} lg={10} className='scheduleDiv__detail'>
                    <Box>
                        <p><span style={{ fontWeight: '500' }}>Start: </span>
                            {startDate}
                        </p>
                        <p><span style={{ fontWeight: '500' }}>End: </span>
                            {endDate}
                        </p>
                        <p className='price'><span style={{ fontWeight: '500' }}>Price: </span>
                            {formatPrice(schedule.price)}
                        </p>
                    </Box>
                </Grid>
                <Grid item md={2} lg={2} className='scheduleDiv__cancel'>
                    <CancelScheduleItem onSubmit={handleCancel} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default ServiceSchedule;
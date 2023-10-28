import { Box, Button, Dialog, DialogActions, DialogContent, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromServiceList } from '../AddService/serviceSlice';
import ServiceSchedule from '../ServiceSchedule';
import CancelService from './CancelService';
import ScheduleForm from './ScheduleForm';
import './style.scss';

ServiceItem.propTypes = {
    service: PropTypes.object,
    onScheduleSubmit: PropTypes.func,
};

function ServiceItem(props) {

    const { service, onScheduleSubmit = null } = props;
    const [serviceScheduler, setServiceScheduler] = useState([]);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        setServiceScheduler(service.serviceScheduler);
    }, [service.serviceScheduler]);

    //console.log(serviceScheduler);

    const dispatch = useDispatch();

    const handleAddSchedule = async (formValues) => {
        if (onScheduleSubmit) {
            await onScheduleSubmit(formValues);
            setOpen(false);
        }
    }

    const handleCancelService = () => {
        const action = removeFromServiceList();
        dispatch(action);
        window.location.reload();
    }

    return (
        <Box className="serviceDiv">
            <Box className="serviceDiv__img">
                <img src={service.imageLink} alt="" width='100%' />
            </Box>
            <Box className="serviceDiv__detail">
                <Typography className='header'>
                    {service.serviceName}
                </Typography>
                <Typography className='description'>
                    {service.serviceDes}
                </Typography>
            </Box>
            <Box className="serviceDiv__schedule">
                <Grid container spacing={1}>
                    {serviceScheduler.map((schedule, index) => (
                        <Grid item key={index} md={6} lg={6}>
                            <ServiceSchedule schedule={schedule} scheduleIndex={index} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box style={{ padding: '0 200px', margin: '10px 0 30px 0' }}>
                <Button fullWidth variant='contained' className='createServiceBtn' onClick={handleClickOpen}>
                    ADD SCHEDULE
                </Button>
                <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                    <DialogContent>

                        <ScheduleForm onSubmit={handleAddSchedule} />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </Box>
            <Box style={{ padding: '0 200px', margin: '10px 0 30px 0' }}>
                <CancelService onSubmit={handleCancelService} />
            </Box>
        </Box>
    );
}

export default ServiceItem;
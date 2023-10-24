import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Box, Grid, Typography, Button, Dialog, DialogContent, DialogActions } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import ServiceSchedule from '../ServiceSchedule';
import ScheduleForm from './ScheduleForm';
import { useDispatch } from 'react-redux';
import { addScheduleToService, removeFromServiceList } from '../AddService/serviceSlice';
import CancelService from './CancelService';

ServiceItem.propTypes = {
    service: PropTypes.object,
    index: PropTypes.number,
};

function ServiceItem(props) {

    const { service, index } = props;
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

    const handleAddSchedule = (formValues) => {
        console.log("Schedule submit: ", formValues);
        const scheduleItem = {
            index: index,
            startDate: formValues.startDate,
            endDate: formValues.endDate,
            price: formValues.price
        };
        const action = addScheduleToService(scheduleItem);
        dispatch(action);
        window.location.reload();
    }

    const handleCancelService = () => {
        const action = removeFromServiceList();
        dispatch(action);
        window.location.reload();
    }

    return (
        <Box className="serviceDiv">
            <Box className="serviceDiv__img">
                <img src={service.imgLink} alt="" width='100%' />
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
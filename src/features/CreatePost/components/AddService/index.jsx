import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import React, { useState } from 'react';
//import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import ServiceForm from './ServiceForm';
import { addToServiceList } from './serviceSlice';
import './style.scss';

AddService.propTypes = {

};

function AddService(props) {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();

    const handleAddService = (formValues) => {
        const serviceItem = {
            serviceName: formValues.serviceName,
            serviceDes: formValues.serviceDes,
            imgLink: formValues.imgLink,
            serviceScheduler: [{
                startDate: formValues.startDate,
                endDate: formValues.endDate,
                price: formValues.price
            }]
        };
        console.log("Service submit: ", serviceItem);
        const action = addToServiceList(serviceItem);
        dispatch(action);
        window.location.reload();
    }

    return (
        <div style={{ margin: '20px 0 50px 0' }} className='addBtnService'>
            <Button onClick={handleClickOpen}>
                <Box className='addBtn'>
                    <AddIcon style={{ color: '#fff' }} />
                </Box>
            </Button>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogContent>

                    <ServiceForm onSubmit={handleAddService} />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}

export default AddService;
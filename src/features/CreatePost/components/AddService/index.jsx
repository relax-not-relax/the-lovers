import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ServiceForm from './ServiceForm';
import './style.scss';

AddService.propTypes = {
    onServiceSubmit: PropTypes.func,
};

function AddService(props) {

    const [open, setOpen] = useState(false);
    const { onServiceSubmit = null } = props;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleAddService = async (formValues) => {

        if (onServiceSubmit) {
            await onServiceSubmit(formValues);
            setOpen(false);
        }

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
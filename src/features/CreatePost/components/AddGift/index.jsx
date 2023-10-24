import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import React, { useState } from 'react';
import GiftForm from './GiftForm';
import './style.scss';
//import fileApi from '../../../../api/fileApi';
//import axios from 'axios';
import PropTypes from 'prop-types';

AddGift.propTypes = {
    onGiftSubmit: PropTypes.func,
};

function AddGift(props) {
    const [open, setOpen] = useState(false);
    const { onGiftSubmit = null } = props;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddGift = async (formValues) => {
        if (onGiftSubmit) {

            await onGiftSubmit(formValues);
            setOpen(false);
        }
    }

    //localStorage.removeItem('gifts');

    return (
        <div style={{ margin: '20px 0 50px 0' }} className="addBtnGift">
            <Button onClick={handleClickOpen}>
                <Box className='addBtn'>
                    <AddIcon style={{ color: '#fff' }} />
                </Box>
            </Button>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogContent>

                    <GiftForm onSubmit={handleAddGift} />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddGift;
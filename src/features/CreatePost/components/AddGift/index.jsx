import { Box, Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import GiftForm from './GiftForm';
import { addToPackage } from './giftSlice'
import AddIcon from '@mui/icons-material/Add';
import './style.scss';
//import PropTypes from 'prop-types';

AddGift.propTypes = {

};

function AddGift(props) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();

    const handleAddGift = (formValues) => {
        console.log('Gift submit', formValues);
        const action = addToPackage(formValues);
        dispatch(action);
        window.location.reload();
    }

    //localStorage.removeItem('gifts');

    return (
        <div style={{ margin: '20px 0 50px 0' }}>
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
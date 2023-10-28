import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ProductForm from './ProductForm';

AddProduct.propTypes = {
    onProductSubmit: PropTypes.func,
};

function AddProduct(props) {

    const [open, setOpen] = useState(false);
    const { onProductSubmit = null } = props;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleAddProduct = async (formValues) => {

        if (onProductSubmit) {
            await onProductSubmit(formValues);
            setOpen(false);
        }
    }

    return (
        <div style={{ margin: '20px 0 50px 0' }} className='addBtnProduct'>
            <Button onClick={handleClickOpen}>
                <Box className='addBtn'>
                    <AddIcon style={{ color: '#fff' }} />
                </Box>
            </Button>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogContent>

                    <ProductForm onSubmit={handleAddProduct} />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddProduct;
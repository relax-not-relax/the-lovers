import { Box, Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import ProductForm from './ProductForm';
import { addToProductList } from './productSlice';
//import PropTypes from 'prop-types';

AddProduct.propTypes = {

};

function AddProduct(props) {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();

    const handleAddProduct = (formValues) => {
        console.log('Product submit', formValues);
        const action = addToProductList(formValues);
        dispatch(action);
        window.location.reload();
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
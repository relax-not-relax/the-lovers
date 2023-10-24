import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

CancelProduct.propTypes = {
    onSubmit: PropTypes.func,
};

function CancelProduct(props) {

    const { onSubmit = null } = props;

    const handleSubmit = async () => {
        if (onSubmit) {
            await onSubmit();
        }

        //form.reset();
    }

    return (
        <div>
            <Button fullWidth variant='contained' className='deleteBtn' onClick={handleSubmit} style={{ background: '#C70039' }}>
                <CancelIcon />
            </Button>
        </div>
    );
}

export default CancelProduct;
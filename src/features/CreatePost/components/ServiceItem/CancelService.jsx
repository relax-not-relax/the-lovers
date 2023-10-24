import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

CancelService.propTypes = {
    onSubmit: PropTypes.func,
};

function CancelService(props) {

    const { onSubmit = null } = props;

    const handleSubmit = async () => {
        if (onSubmit) {
            await onSubmit();
        }

        //form.reset();
    }

    return (
        <div>
            <Button fullWidth variant='contained' className='deleteServiceBtn' onClick={handleSubmit}>
                CANCEL SERVICE
            </Button>
        </div>
    );
}

export default CancelService;
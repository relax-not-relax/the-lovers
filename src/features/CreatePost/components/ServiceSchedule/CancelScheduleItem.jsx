import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

CancelScheduleItem.propTypes = {
    onSubmit: PropTypes.func,
};

function CancelScheduleItem(props) {

    const { onSubmit = null } = props;

    const handleSubmit = async () => {
        if (onSubmit) {
            await onSubmit();
        }

        //form.reset();
    }

    return (
        <Box onClick={handleSubmit} style={{ cursor: 'pointer' }}>
            <CancelIcon color='error' />
        </Box>
    );
}

export default CancelScheduleItem;
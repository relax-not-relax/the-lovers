import React from 'react';
import PropTypes from 'prop-types';
import CancelIcon from '@mui/icons-material/Cancel';

CancelGift.propTypes = {
    onSubmit: PropTypes.func,
};

function CancelGift(props) {
    const { onSubmit = null } = props;

    const handleSubmit = async () => {
        if (onSubmit) {
            await onSubmit();
        }

        //form.reset();
    }

    return (
        <div>
            <CancelIcon fontSize='large' style={{ color: '#FF6969', cursor: 'pointer' }} onClick={handleSubmit} />
        </div>
    );
}

export default CancelGift;
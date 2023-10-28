import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import './style.scss';

FilterViewer.propTypes = {
    onChange: PropTypes.func,
    onReset: PropTypes.func,
};

function FilterViewer(props) {

    const { onChange, onReset } = props;
    const postType = ['gift', 'product', 'service'];

    const handleTypeChange = (type) => {
        onChange(type);
    }

    const handleAllClick = () => {
        onReset();
    };

    return (
        <Box className='typeDiv'>
            <div className='typeDiv__menu'>
                {postType.map((type, idx) => (
                    <div key={idx} onClick={() => handleTypeChange(type)} className='typeItem'>
                        <Typography className='name'>{type}</Typography>
                    </div>
                ))}
                <div onClick={handleAllClick} className='typeItem'><Typography className='name'>All</Typography></div>
            </div>
        </Box>
    );
}

export default FilterViewer;
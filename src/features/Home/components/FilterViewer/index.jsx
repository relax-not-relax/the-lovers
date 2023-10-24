import { Box, Chip } from '@mui/material';
import React from 'react';
//import PropTypes from 'prop-types';
import './style.scss';

const FILTER_LIST = [
    {
        id: 1,
        getLabel: () => 'Gift',
        isActive: () => { },
        isVisible: () => true,
        isRemovable: false,
        onRemove: () => { },
        onToggle: () => { },
    },

    {
        id: 2,
        getLabel: () => 'Product',
        isActive: () => { },
        isVisible: () => true,
        isRemovable: false,
        onRemove: () => { },
        onToggle: () => { },
    },

    {
        id: 3,
        getLabel: () => 'Service',
        isActive: () => { },
        isVisible: () => true,
        isRemovable: false,
        onRemove: () => { },
        onToggle: () => { },
    },
];

FilterViewer.propTypes = {

};

function FilterViewer(props) {

    const visibleFilters = () => {
        return FILTER_LIST;
    }

    const handleClick = () => {
        console.info('You clicked the Chip.');
    };


    return (
        <Box component="ul" className='filterList'>
            {visibleFilters.map(x => (
                <li key={x.id}>
                    <Chip
                        label={x.getLabel()}
                        color={x.isActive() ? 'primary' : 'default'}
                        clickable={!x.isRemovable}
                        onClick={handleClick}
                        onDelete={handleClick}
                    />
                </li>
            ))}
        </Box>
    );
}

export default FilterViewer;
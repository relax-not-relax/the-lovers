import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import Gift from '../Gift';

GiftList.propTypes = {
    giftList: PropTypes.array,
};

GiftList.defaultProps = {
    giftList: [],
};

function GiftList(props) {

    const { giftList } = props;

    return (
        <div style={{ margin: '40px 0' }}>
            {giftList.map((gift, index) => (
                <Box key={index}>
                    <Gift gift={gift} />
                </Box>
            ))}
        </div>
    );
}

export default GiftList;
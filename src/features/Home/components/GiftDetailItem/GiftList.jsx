import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import GiftDetail from './GiftDetail';

GiftList.propTypes = {
    giftList: PropTypes.array,
};

function GiftList(props) {

    const { giftList } = props;

    return (
        <Box marginTop={3}>
            {giftList.map((gift, idx) => (
                <GiftDetail gift={gift} key={idx} />
            ))}
        </Box>
    );
}

export default GiftList;
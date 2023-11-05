import { Box } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import giftAPI from '../../../../api/giftApi';
import StorageKeys from '../../../../constants/storage-keys';
import GiftGivenItem from './GiftGivenItem';
import './style.scss';

GiftGiven.propTypes = {

};

function GiftGiven(props) {

    const [giftList, setGiftList] = useState([]);

    useEffect(() => {
        (async () => {
            const userDataFromLocalStorage = localStorage.getItem(StorageKeys.USER);

            if (userDataFromLocalStorage) {
                const parsedUserData = JSON.parse(userDataFromLocalStorage);
                const response = await giftAPI.getGiftsGiven(parsedUserData.accountId);
                console.log(response);
                setGiftList(response);
            }

        })();
    }, [])

    return (
        <Box style={{ marginTop: '50px' }}>
            {giftList.map((item, idx) => (
                <Box key={idx}>
                    <GiftGivenItem item={item} />
                </Box>
            ))}
        </Box>
    );
}

export default GiftGiven;
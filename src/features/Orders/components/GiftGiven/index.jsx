import { Box } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import commentApiOdata from '../../../../api/odata/commentApiOdata';
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
                const params = {
                    $filter: `(AccountId eq ${parsedUserData.accountId}) and (ApproveStatus eq 'accept')`
                }
                const response = await commentApiOdata.get(params);
                setGiftList(response.value);
            }

        })();
    }, [])

    return (
        <Box>
            {giftList.map((item, idx) => (
                <Box key={idx}>
                    <GiftGivenItem item={item} />
                </Box>
            ))}
        </Box>
    );
}

export default GiftGiven;
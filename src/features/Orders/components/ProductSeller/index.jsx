import { Box } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import orderAPI from '../../../../api/orderApi';
import StorageKeys from '../../../../constants/storage-keys';
import Sell from './Sell';
import './style.scss';

ProductSeller.propTypes = {

};

function ProductSeller(props) {

    const [sells, setSells] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const userDataFromLocalStorage = localStorage.getItem(StorageKeys.USER);
                if (userDataFromLocalStorage) {
                    const parsedUserData = JSON.parse(userDataFromLocalStorage);
                    if (parsedUserData) {
                        const response = await orderAPI.get(parsedUserData.accountId);
                        setSells(response);
                    }
                }
            } catch (error) {
                console.log('Failed to get items', error);
            }
        })()
    }, []);

    return (
        <Box style={{ marginTop: '50px' }}>
            {sells.map((item, idx) => (
                <Box key={idx}>
                    <Sell item={item} />
                </Box>
            ))}
        </Box>
    );
}

export default ProductSeller;
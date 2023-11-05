import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import orderApiOdata from '../../../../api/odata/orderApiOdata';
import StorageKeys from '../../../../constants/storage-keys';
import Order from './Order';
import './style.scss';

HistoryOrders.propTypes = {

};

function HistoryOrders(props) {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const userDataFromLocalStorage = localStorage.getItem(StorageKeys.USER);
                if (userDataFromLocalStorage) {
                    const parsedUserData = JSON.parse(userDataFromLocalStorage);
                    if (parsedUserData) {
                        const response = await orderApiOdata.get({
                            $filter: `AccountId eq ${parsedUserData.accountId}`,
                            $expand: 'OrderDetails'
                        });

                        //console.log(response.value);
                        const orders = response.value;
                        const allOrderDetails = orders.flatMap(order => order.OrderDetails);
                        //console.log(allOrderDetails);

                        setOrders(allOrderDetails);

                    }
                }
            } catch (error) {
                console.log('Failed to load order details', error);
            }
        })();
    }, []);


    return (
        <Box style={{ marginTop: '50px' }}>
            {orders.map((order, idx) => (
                <Box key={idx}>
                    <Order order={order} />
                </Box>
            ))}
        </Box>
    );
}

export default HistoryOrders;
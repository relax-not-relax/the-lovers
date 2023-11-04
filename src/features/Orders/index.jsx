import { Box } from '@mui/material';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom/cjs/react-router-dom';
import GiftGiven from './components/GiftGiven';
import HistoryOrders from './components/HistoryOrders';
import OrderMenu from './components/OrderMenu';
import ProductSeller from './components/ProductSeller';
import './style.scss';

OrdersFeature.propTypes = {

};

function OrdersFeature(props) {

    const { url } = useRouteMatch();

    return (
        <Box className='orderViewSection'>
            <OrderMenu />

            <Switch>
                <Route exact path={url}>
                    <HistoryOrders />
                </Route>

                <Route path={`${url}/sells`} component={ProductSeller} />
                <Route path={`${url}/gift`} component={GiftGiven} />
            </Switch>
        </Box>
    );
}

export default OrdersFeature;
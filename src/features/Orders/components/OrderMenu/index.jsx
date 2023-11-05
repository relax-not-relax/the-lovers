import { Box, Link } from '@mui/material';
import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom/cjs/react-router-dom';
import './style.scss';


OrderMenu.propTypes = {

};

function OrderMenu(props) {

    const { url } = useRouteMatch();

    return (
        <Box component="ul" className='menuDiv'>
            <li>
                <Link component={NavLink} to={url} exact>History Orders</Link>
            </li>

            <li>
                <Link component={NavLink} to={`${url}/sells`} exact>Item Seller</Link>
            </li>

            <li>
                <Link component={NavLink} to={`${url}/gift`} exact>Gift Given</Link>
            </li>
        </Box>
    );
}

export default OrderMenu;
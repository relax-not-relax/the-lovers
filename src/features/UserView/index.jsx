import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom/cjs/react-router-dom';
import { Box } from '@mui/material';
import Profile from './pages/Profile';

UserViewFeature.propTypes = {

};

function UserViewFeature(props) {

    const match = useRouteMatch();

    return (
        <Box>
            <Switch>
                <Route path={`${match.url}/:accountId`} component={Profile} />
            </Switch>
        </Box>
    );
}

export default UserViewFeature;
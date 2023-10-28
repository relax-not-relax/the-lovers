import { Box } from '@mui/material';
import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom/cjs/react-router-dom';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage'
import './style.scss';

HomeFeature.propTypes = {

};

function HomeFeature(props) {

    const match = useRouteMatch();

    return (
        <Box>
            <Switch>
                <Route path={match.url} exact component={ListPage} />
                <Route path={`${match.url}/post/:postId`} component={DetailPage} />
            </Switch>
        </Box>
    );
}

export default HomeFeature;
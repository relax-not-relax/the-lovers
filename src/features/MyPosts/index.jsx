import { Box } from '@mui/material';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom/cjs/react-router-dom';
//import DetailPage from '../MyPosts/pages/DetailPage';
import ListPage from '../MyPosts/pages/ListPage';

MyPostsFeature.propTypes = {

};

function MyPostsFeature(props) {

    const match = useRouteMatch();

    return (
        <Box>
            <Switch>
                <Route path={match.url} exact component={ListPage} />
                {/* <Route path={`${match.url}/post/:postId`} component={DetailPage} /> */}
            </Switch>
        </Box>
    );
}

export default MyPostsFeature;
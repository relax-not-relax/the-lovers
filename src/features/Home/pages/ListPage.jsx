import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
//import FilterViewer from '../components/FilterViewer';
import '../style.scss';


ListPage.propTypes = {

};

function ListPage(props) {
    return (
        <Box className='homeSection'>
            <Box className='homeSection__hd'>
                <Grid container>
                    <Grid item md={4} lg={4}>
                        <Typography className='header'>Feeds</Typography>
                    </Grid>
                    <Grid item md={8} lg={8}>
                        {/* <FilterViewer /> */}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default ListPage;
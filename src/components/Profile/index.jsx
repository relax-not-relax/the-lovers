import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
//import PropTypes from 'prop-types';
import './style.scss';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import StorageKeys from '../../constants/storage-keys';

Profile.propTypes = {

};

function Profile(props) {

    const history = useHistory();

    const handleProfileClick = () => {
        history.push('/account');
    }

    const [loginUser, setLoginUser] = useState({});

    useEffect(() => {
        const userData = localStorage.getItem(StorageKeys.USER);

        if (userData) {
            const parsedUserData = JSON.parse(userData);
            setLoginUser(parsedUserData);
        }
    }, []);

    return (
        <Box className='profileDiv' onClick={handleProfileClick}>
            <Box>
                <Grid container spacing={1}>
                    <Grid item md={3} lg={3}>
                        <img src={loginUser.avatarLink ? loginUser.avatarLink : 'https://firebasestorage.googleapis.com/v0/b/voicespire-7162e.appspot.com/o/imgs%2F20231025013807461.png?alt=media&token=209b22c7-c184-48e9-8ce0-c657c5f66182'} alt="" width='80%' />
                    </Grid>
                    <Grid item md={9} lg={9}>
                        <Box>
                            <Typography className='accountName'>{loginUser.fullName}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Profile;
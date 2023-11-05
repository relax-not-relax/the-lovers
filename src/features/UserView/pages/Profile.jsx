import { Box, Button, Container, Dialog, DialogActions, DialogContent, Grid, LinearProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import postApiOdata from '../../../api/odata/postApiOdata';
import userAPIv2 from '../../../api/userApiv2';
import PostList from '../../Home/components/PostList';
import PostSkeleton from '../../Home/components/PostSkeleton';
import Report from '../components/Report';
import useUserDetail from '../hooks/useUserDetail';
import '../style.scss';

Profile.propTypes = {

};

function Profile(props) {

    const {
        params: { accountId },

    } = useRouteMatch();

    const { listPost, loading } = useUserDetail(accountId);
    const [user, setUser] = useState({});
    const [count, setCount] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                const response = await userAPIv2.get(accountId);
                setUser(response);
                console.log(response);
            } catch (error) {
                console.log('Failed to load user info', error);

            }
        })();
    }, [accountId]);


    useEffect(() => {
        (async () => {
            try {
                const response = await postApiOdata.getCount({
                    $filter: `OwnerId eq ${accountId}`,
                })
                setCount(response);
            } catch (error) {
                console.log('Failed to to count', error);
            }
        })();
    }, [accountId]);

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    if (loading) {
        return <Box className="loading">
            <LinearProgress />
        </Box>
    }

    return (
        <Box className='profilePostsSection'>
            <Box className='profilePostsSection__hd'>
                <Grid container>
                    <Grid item md={2} lg={2}>
                        <Box className='imgDiv' style={{
                            cursor: 'pointer'
                        }}>
                            <img
                                src={user.avatarLink ? user.avatarLink : 'https://firebasestorage.googleapis.com/v0/b/voicespire-7162e.appspot.com/o/imgs%2F20231025013807461.png?alt=media&token=209b22c7-c184-48e9-8ce0-c657c5f66182'}
                                alt=""
                            />
                        </Box>
                    </Grid>
                    <Grid item md={10} lg={10} paddingLeft={10}>
                        <Box className='nameDiv'>
                            <Typography className='name'>{user.fullName}</Typography>
                            <Box>
                                <Button variant="outlined" color="error" onClick={handleClickOpen}>
                                    Report
                                </Button>
                            </Box>
                            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                                <DialogContent>

                                    <Report reportedPersonId={user.accountId} />

                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                </DialogActions>
                            </Dialog>
                        </Box>
                        <Box>
                            <p style={{
                                fontSize: '18px',
                                fontWeight: '300'
                            }}>
                                <span style={{ fontWeight: '500' }}>{count}</span>  posts
                            </p>
                            <Typography>{user.description}</Typography>
                            <p style={{
                                fontSize: '16px',
                                marginTop: '0'
                            }}>
                                <span style={{ fontWeight: '500' }}>Contact:</span>  {user.phone}
                            </p>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Container>
                <Box style={{ margin: '50px 0' }}>
                    {loading ? <PostSkeleton length={5} /> : <PostList data={listPost} />}
                </Box>
            </Container>
        </Box>
    );
}

export default Profile;
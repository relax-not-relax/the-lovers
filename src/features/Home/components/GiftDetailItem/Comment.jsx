import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Alert, AlertTitle, Box, Button, Grid, LinearProgress } from '@mui/material';
import InputField from '../../../../components/form-controls/InputField';
import SendIcon from '@mui/icons-material/Send';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import commentAPI from '../../../../api/comment';
import StorageKeys from '../../../../constants/storage-keys';

Comment.propTypes = {
    giftId: PropTypes.string.isRequired,
};

function Comment(props) {
    const { giftId } = props;
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [loginUser, setLoginUser] = useState({});

    useEffect(() => {
        const userData = localStorage.getItem(StorageKeys.USER);

        if (userData) {
            const parsedUserData = JSON.parse(userData);
            setLoginUser(parsedUserData);
        }
    }, []);

    const schema = yup.object().shape({
        content: yup.string().required('Please post a comment'),
    });

    const form = useForm({
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (values) => {
        //console.log(values);
        try {

            const request = {
                giftCommentId: 0,
                giftId: giftId,
                accountId: loginUser.accountId,
                content: values.content,
                createDate: null,
                status: true,
                approveStatus: "",
                account: null,
            }
            //console.log(request);
            await commentAPI.add(request);
            window.location.reload();

        } catch (error) {
            setSuccess('');
            setError('You have already commented on this gift')
        }
    }

    const { isSubmitting } = form.formState;

    return (
        <Box>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Grid container>
                    <Grid item md={11} lg={11}>
                        <InputField name='content' label='Comment' form={form} errors={form.formState.errors} />
                    </Grid>
                    <Grid item md={1} lg={1} style={{
                        marginTop: '25px',
                    }}>
                        <Box>
                            <Button disabled={isSubmitting} type='submit' fullWidth >
                                <SendIcon fontSize='medium' />
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                {isSubmitting && <LinearProgress style={{ margin: '8px 0' }} />}
            </form>
            {error !== '' && (
                <>
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        You don't have permission — <strong>{error}</strong>
                    </Alert>
                </>
            )}
            {success !== '' && (
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    Successfully — <strong>{success}</strong>
                </Alert>
            )}

        </Box>
    );
}

export default Comment;
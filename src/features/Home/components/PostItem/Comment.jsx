import { yupResolver } from '@hookform/resolvers/yup';
import SendIcon from '@mui/icons-material/Send';
import { Alert, AlertTitle, Box, Button, Grid, LinearProgress } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import commentAPI from '../../../../api/comment';
import InputField from '../../../../components/form-controls/InputField';
import './style.scss';

Comment.propTypes = {
    giftId: PropTypes.string.isRequired,
    accountId: PropTypes.number.isRequired,
};

function Comment(props) {

    const { giftId, accountId } = props;
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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
                accountId: accountId,
                content: values.content,
                createDate: null,
                status: true,
                approveStatus: "",
                account: null,
            }
            //console.log(request);
            await commentAPI.add(request);
            setError('')
            setSuccess('Yay! You may be the owner of this gift');

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
                    <Grid item md={1} lg={1} className='postBtnDiv'>
                        <Box>
                            <Button disabled={isSubmitting} type='submit' fullWidth className='createBtn' >
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
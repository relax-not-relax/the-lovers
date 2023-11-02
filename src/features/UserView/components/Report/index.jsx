import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import './style.scss'
import { Alert, AlertTitle, Box, Button, Typography } from '@mui/material';
import InputField from '../../../../components/form-controls/InputField';
import { useEffect } from 'react';
import StorageKeys from '../../../../constants/storage-keys';
import { useState } from 'react';
import reportApi from '../../../../api/reportApi';

Report.propTypes = {
    reportedPersonId: PropTypes.number,
};

function Report(props) {

    const { reportedPersonId } = props;

    const schema = yup.object().shape({
        content: yup.string().required('Please give a report reason'),
    });

    const form = useForm({
        resolver: yupResolver(schema),
    });

    const [reporter, setReporter] = useState({});

    useEffect(() => {
        const userDataFromLocalStorage = localStorage.getItem(StorageKeys.USER);

        if (userDataFromLocalStorage) {
            const parsedUserData = JSON.parse(userDataFromLocalStorage);
            setReporter(parsedUserData);
        }

    }, []);

    const [success, setSuccess] = useState('');

    const handleSubmit = async (values) => {
        try {
            const request = {
                reporterId: reporter.accountId,
                reportedPersonId: reportedPersonId,
                content: values.content,
                reportedPerson: null,
                reporter: null,
            }
            await reportApi.report(request);
            setSuccess('Thank you for your announcement');
        } catch (error) {
            console.log('Failed to report', error);
        }
    }

    const { isSubmitting } = form.formState;

    return (
        <Box>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Box className='reportDiv'>
                    <Typography style={{ fontSize: '17px', fontWeight: '500' }}>Report Reason</Typography>
                    <InputField name='content' label='Report' form={form} errors={form.formState.errors} />
                    <Box style={{ padding: '0 100px', marginTop: '20px' }}>
                        <Button disabled={isSubmitting} type='submit' fullWidth variant='contained'>
                            Sent
                        </Button>
                    </Box>
                    {success !== '' && (
                        <>
                            <Box style={{ marginTop: '20px' }}>
                                <Alert severity="success">
                                    <AlertTitle>Success</AlertTitle>
                                    {success} — <strong>We will check it soon!</strong>
                                </Alert>
                            </Box>
                        </>
                    )}

                </Box>
            </form>
        </Box>
    );
}

export default Report;
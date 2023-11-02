import { Box, Button, Dialog, DialogActions, DialogContent, Divider, Grid, LinearProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
//import PropTypes from 'prop-types';
import './style.scss';
//import avatar from '../../images/avatar.png';
import { yupResolver } from '@hookform/resolvers/yup';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import dateFormat, { masks } from "dateformat";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import DefaultValueField from '../../components/form-controls/DefaultValueField';
import OnlyDateField from '../../components/form-controls/OnlyDateField';
import StorageKeys from '../../constants/storage-keys';
//import userAPI from '../../api/userApi';
import { useDispatch } from 'react-redux';
import { updateInformation } from '../Auth/userSlice';
import userAPIv2 from '../../api/userApiv2';

AccountMgnFeature.propTypes = {

};

function AccountMgnFeature(props) {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const now = new Date();

    const schema = yup.object().shape({
        email: yup.string()
            .required('Please enter your email')
            .email('Please enter a valid email address'),
        fullName: yup.string()
            .required('Please enter your full name')
            .test('Should has at least two words', 'Please enter at least two words', (value) => {
                return value.split(' ').length >= 2;
            }),
        dateOfBirth: yup
            .date()
            .max(now, 'Birth date must be before the current date'),
        phone: yup.string(),
        address: yup.string(),

    });

    const [loginUser, setLoginUser] = useState({});

    //Avatar change 
    const [avatar, setAvatar] = useState('');
    const [image, setImage] = useState({});
    const handleImage = (e) => {
        console.log(e.target.files);
        setImage({
            file: e.target.files[0],
        });
    };

    useEffect(() => {
        (async () => {
            if (image.file) {
                const headers = {
                    accept: "*/*",
                    "Content-Type": "multipart/form-data",
                };

                const response = await axios.post("https://beprn231catdoglover20231030132717.azurewebsites.net/api/FireBase/UploadImageFile", image, { headers });

                if (response.status === 200) {
                    setAvatar(response.data);
                }
            } else {
                setAvatar("https://firebasestorage.googleapis.com/v0/b/voicespire-7162e.appspot.com/o/imgs%2F20231025013807461.png?alt=media&token=209b22c7-c184-48e9-8ce0-c657c5f66182")
            }
        })()
    }, [image]);

    const [profileName, setProfileName] = useState('');
    const [profileEmail, setProfileEmail] = useState('');
    const [profilePhone, setProfilePhone] = useState('');
    const [profileAddress, setProfileAddress] = useState('');
    const [profileDOB, setProfileDOB] = useState(new Date());

    useEffect(() => {
        const userData = localStorage.getItem(StorageKeys.USER);

        if (userData) {
            const parsedUserData = JSON.parse(userData);
            setLoginUser(parsedUserData);
            setAvatar(parsedUserData.avatarLink);
            setDescription(parsedUserData.description);
            setProfileName(parsedUserData.fullName);
            setProfileEmail(parsedUserData.email);
            setProfilePhone(parsedUserData.phone);
            setProfileAddress(parsedUserData.address);
            setProfileDOB(new Date(parsedUserData.dateOfBirth));
        }
    }, []);

    const form = useForm({
        defaultValues: {
            fullName: profileName,
            email: profileEmail,
            address: profileAddress,
            phone: profilePhone,
            dateOfBirth: profileDOB.toLocaleDateString(),
        },
        resolver: yupResolver(schema),
    });

    masks.hammerTime = 'yyyy-mm-dd';

    useEffect(() => {
        form.reset({
            fullName: profileName,
            email: profileEmail,
            address: profileAddress,
            phone: profilePhone,
            dateOfBirth: dateFormat(profileDOB.toLocaleDateString(), "hammerTime"),
        })

    }, [profileName, profileEmail, profilePhone, profileAddress, profileDOB, form]);

    //Description change
    const [description, setDescription] = useState('');
    const [content, setContent] = useState(description);
    const handleTextAreaChange = (e) => {
        setContent(e.target.value);
    }
    const handleDesChange = () => {
        setDescription(content);
        setOpen(false);
    }

    const dispatch = useDispatch();
    //const [error, setError] = useState('');

    const handleSubmit = async (values) => {
        // console.log({
        //     ...values,
        //     dateOfBirth: values.dateOfBirth.toString(),
        //     description: description,
        //     avatarLink: avatar,
        // });

        try {
            const request = {
                accountId: loginUser.accountId,
                email: values.email,
                fullName: values.fullName,
                dateOfBirth: dateFormat(values.dateOfBirth, "isoUtcDateTime"),
                phone: values.phone,
                address: values.address,
                avatarLink: avatar,
                description: description,
            }
            console.log(request);
            await userAPIv2.updateProfile(request);
            const action = updateInformation(request);
            await dispatch(action);
            window.location.reload();

        } catch (error) {
            console.log('Failed to submit form', error);
        }
    }

    const { isSubmitting } = form.formState;

    return (
        <Box className='accountMgnDiv'>
            <Box className='accountMgnDiv__edit'>
                {isSubmitting && <LinearProgress className='form__pg' />}
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <Box>
                        <Grid container>
                            <Grid item md={6} lg={6}>
                                <Typography className='header'>Profile</Typography>
                                <Typography className='sub'>Setting for your personal profile</Typography>
                            </Grid>
                            <Grid item md={6} lg={6} className='profileBtn'>
                                <Box>
                                    <Button type='submit' fullWidth variant='contained' className='updateBtn' >
                                        Save changes
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <Divider style={{ marginTop: '25px', marginBottom: '25px' }} />
                    <Box>
                        <Grid container>
                            <Grid item md={2} lg={2}>
                                <Box className='imgDiv'>
                                    <img
                                        src={avatar ? avatar : 'https://firebasestorage.googleapis.com/v0/b/voicespire-7162e.appspot.com/o/imgs%2F20231025013807461.png?alt=media&token=209b22c7-c184-48e9-8ce0-c657c5f66182'}
                                        alt=""
                                    />
                                </Box>
                            </Grid>
                            <Grid item md={7} lg={7} className='accountProfile'>
                                <Box>
                                    <Typography className='name'>{loginUser.fullName}</Typography>
                                    <Box className='desDiv'>
                                        <Typography className='des'>
                                            {description ? description : ''}
                                        </Typography>
                                        <EditIcon fontSize='small' onClick={handleClickOpen} />
                                        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                                            <DialogContent>
                                                <Typography style={{
                                                    fontSize: '15px',
                                                    fontWeight: '500',
                                                    marginBottom: '10px',
                                                }}>Description</Typography>
                                                <textarea
                                                    style={{ width: '450px' }}
                                                    cols="100%"
                                                    rows="10"
                                                    className='contentArea'
                                                    value={content ? content : ''}
                                                    onChange={handleTextAreaChange}>
                                                </textarea>
                                                <Box style={{
                                                    padding: '0 150px',
                                                    marginTop: '20px'
                                                }}>
                                                    <Button fullWidth variant='contained' style={{
                                                        background: "#1f4172",
                                                    }} onClick={handleDesChange}>
                                                        Save
                                                    </Button>
                                                </Box>

                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClose}>Cancel</Button>
                                            </DialogActions>
                                        </Dialog>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item md={3} lg={3} className='uploadDiv'>
                                <Box>
                                    <label className='uploadFile'>
                                        <input type="file" name='file' onChange={handleImage} />
                                        CHANGE IMAGE
                                    </label>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box className='profileDetail'>
                        <DefaultValueField name='fullName' label='Full Name' form={form} errors={form.formState.errors} />
                        <DefaultValueField name='email' label='Email' form={form} errors={form.formState.errors} />
                        <Grid container spacing={3}>
                            <Grid item md={6} lg={6}>
                                <DefaultValueField name='phone' label='Phone' form={form} errors={form.formState.errors} />
                            </Grid>
                            <Grid item md={6} lg={6}>
                                <OnlyDateField name='dateOfBirth' label='Birth Date' form={form} errors={form.formState.errors} />
                            </Grid>
                        </Grid>
                        <DefaultValueField name='address' label='Address' form={form} errors={form.formState.errors} />
                    </Box>
                </form>
            </Box>

            <Box className='accountMgnDiv__deActive'>
                <Box>
                    <Typography className='header'>Danger Zone</Typography>
                    <Typography className='sub'>Deactive user account</Typography>
                </Box>
                <Divider style={{ marginTop: '25px', marginBottom: '25px' }} />
                <Typography style={{ color: '#a1a1a1' }}>Make sure before deactiving your account, you cannot see any content or notifications of The Lovers.</Typography>
                <Button variant="outlined" color="error" style={{ marginTop: '15px' }}>
                    Deactive my account
                </Button>
            </Box>
        </Box>
    );
}

export default AccountMgnFeature;
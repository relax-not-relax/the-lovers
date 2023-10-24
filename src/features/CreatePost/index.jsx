import { Box, Button, LinearProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
//import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../components/form-controls/InputField';
import './style.scss';
import AddGift from './components/AddGift';
import GiftList from './components/GiftList';
import AddProduct from './components/AddProduct';
import { useRouteMatch, useHistory, Switch, Route, useLocation } from 'react-router-dom/cjs/react-router-dom';
import ProductList from './components/ProductList';
import AddService from './components/AddService';
import ServiceItem from './components/ServiceItem';
import { useDispatch } from 'react-redux';
import StorageKeys from '../../constants/storage-keys'
import { addToPackage, removeGiftPackage } from './components/AddGift/giftSlice';
import postAPI from '../../api/postApi'

CreateFeature.propTypes = {

};

function CreateFeature(props) {

    const { url } = useRouteMatch();
    const history = useHistory();
    const dispatch = useDispatch();

    const location = useLocation();
    const currentRoute = location.pathname;

    useEffect(() => {
        const defaultValue = getDefaultValueType(currentRoute);
        setValueType(defaultValue);
    }, [currentRoute]);


    const getDefaultValueType = (route) => {
        if (route.endsWith('/service')) {
            return 'service';
        } else if (route.endsWith('/product')) {
            return 'product';
        }

        return 'gift';
    };
    const defaultValue = getDefaultValueType(currentRoute);

    const [valueType, setValueType] = useState(defaultValue);


    const schema = yup.object().shape({
        title: yup.string()
            .required('Please enter your post title'),
    });

    const form = useForm({
        defaultValue: {
            title: '',
        },
        resolver: yupResolver(schema),
    });

    const handleRadioChange = (event) => {
        const newValueType = event.target.value;
        setValueType(newValueType);

        let newPath = url;

        if (newValueType !== 'gift') {
            newPath = `${url}/${newValueType}`;
        }

        history.push(newPath);
    };

    const [content, setContent] = useState('');

    const handleTextAreaChange = (e) => {
        setContent(e.target.value);
    }

    const [giftList, setGiftList] = useState([]);
    const [productList, setProductList] = useState([]);
    const [serviceList, setServiceList] = useState([]);
    const [loginUser, setLoginUser] = useState({});

    useEffect(() => {
        const getGiftFromLocalStorage = () => {
            const gifts = localStorage.getItem('gifts');
            return gifts ? JSON.parse(gifts) : [];
        };

        const giftsFromLocalStorage = getGiftFromLocalStorage();
        setGiftList(giftsFromLocalStorage);
    }, [giftList]);

    useEffect(() => {
        const getProductFromLocalStorage = () => {
            const products = localStorage.getItem('products');
            return products ? JSON.parse(products) : [];
        };

        const productsFromLocalStorage = getProductFromLocalStorage();
        setProductList(productsFromLocalStorage);
    }, [productList]);

    useEffect(() => {
        const getServiceFromLocalStorage = () => {
            const services = localStorage.getItem('services');
            return services ? JSON.parse(services) : [];
        };

        const servicesFromLocalStorage = getServiceFromLocalStorage();
        setServiceList(servicesFromLocalStorage);
    }, [serviceList]);

    useEffect(() => {
        const userData = localStorage.getItem(StorageKeys.USER);

        if (userData) {
            const parsedUserData = JSON.parse(userData);
            setLoginUser(parsedUserData);
        }

    }, []);

    const [flag, setFlag] = useState(false);

    useEffect(() => {
        setFlag(false);
    }, []);

    const giftRequest = (values) => {
        return {
            "title": values.title,
            "content": content,
            "ownerId": loginUser.accountId,
            "type": valueType,
            "owner": null,
            "gifts": giftList,
            "products": [null],
            "services": [null],
        }
    }

    const handlePostSubmit = async (values) => {

        if (flag === true) {

            try {

                if (valueType === 'gift' && currentRoute === '/create') {
                    const request = giftRequest(values);

                    await postAPI.add(request);
                    const action = removeGiftPackage();
                    await dispatch(action);
                    window.location.href = '/posts';

                    //console.log(request);
                }

            } catch (error) {
                console.log('Failed to create a post', error);
            }
        }

        setFlag(true);
    }

    const handleAddGift = (values) => {
        setFlag(false);
        console.log('Gift submit', values);
        const action = addToPackage(values);
        dispatch(action);
        //window.location.reload();
    }

    const { isSubmitting } = form.formState;

    return (
        <Box className="createSection">

            <Typography className='createSection__hd'>Create new post</Typography>
            <form onSubmit={form.handleSubmit(handlePostSubmit)} id='postForm'>
                <Box style={{
                    marginBottom: '20px'
                }}>

                    <Typography style={{
                        fontSize: '15px',
                        fontWeight: '500',
                    }}>
                        Title
                    </Typography>
                    <InputField name='title' label='Title' form={form} errors={form.formState.errors} />

                </Box>

                <Box style={{
                    marginBottom: '20px'
                }}>
                    <Typography style={{
                        fontSize: '15px',
                        fontWeight: '500',
                    }}>
                        Content
                    </Typography>
                    <textarea
                        cols="110"
                        rows="10"
                        className='contentArea'
                        value={content ? content : ''}
                        onChange={handleTextAreaChange}></textarea>
                </Box>

                <Box>
                    <Typography style={{
                        fontSize: '15px',
                        fontWeight: '500',
                        marginBottom: '15px',
                    }}>
                        Type
                    </Typography>
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="gift"
                                checked={valueType === 'gift'}
                                onChange={handleRadioChange}
                            />
                            <span style={{ paddingLeft: '10px' }}>Gift</span>
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="service"
                                checked={valueType === 'service'}
                                onChange={handleRadioChange}
                            />
                            <span style={{ paddingLeft: '10px' }}>Service</span>
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="product"
                                checked={valueType === 'product'}
                                onChange={handleRadioChange}
                            />
                            <span style={{ paddingLeft: '10px' }}>Product</span>
                        </label>
                    </div>
                    <div id="content" style={{ display: 'flex', justifyContent: 'center' }}>
                        <Switch>
                            {valueType === 'gift' && (
                                <>
                                    <Route exact path={url}>
                                        <Box>
                                            {(giftList.length > 0) && (
                                                <>
                                                    <GiftList giftList={giftList} />
                                                </>
                                            )}
                                            <AddGift onGiftSubmit={handleAddGift} />
                                        </Box>
                                    </Route>
                                </>
                            )}
                            {valueType === 'service' && (
                                <>
                                    <Route path={`${url}/service`}>
                                        <Box>
                                            {(serviceList.length > 0) && (
                                                <>
                                                    <ServiceItem service={serviceList[0]} index={0} />
                                                </>
                                            )}
                                            {(serviceList.length <= 0) && (
                                                <>
                                                    <AddService />
                                                </>
                                            )}
                                        </Box>
                                    </Route>
                                </>
                            )}
                            {valueType === 'product' && (
                                <>
                                    <Route path={`${url}/product`}>
                                        <Box>
                                            {(productList.length > 0) && (
                                                <>
                                                    <ProductList productList={productList} />
                                                </>
                                            )}
                                            <AddProduct />
                                        </Box>
                                    </Route>
                                </>
                            )}
                        </Switch>

                    </div>
                </Box>
                <Box style={{ padding: '0 200px', marginTop: '50px' }}>
                    {isSubmitting && <LinearProgress style={{ marginBottom: '5px' }} />}
                    <Button disabled={isSubmitting} type='submit' fullWidth variant='contained' className='createBtn' >
                        CREATE
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

export default CreateFeature;
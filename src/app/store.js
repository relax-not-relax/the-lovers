import giftReducer from '../features/CreatePost/components/AddGift/giftSlice';
import productReducer from '../features/CreatePost/components/AddProduct/productSlice';
import serviceReducer from '../features/CreatePost/components/AddService/serviceSlice';
import userReducer from '../features/Auth/userSlice'
import { localStorageMiddleware } from './localStorageMiddleware';
import { loadGiftFromLocalStorage, loadProductsFromLocalStorage, loadServicesFromLocalStorage } from './middleware';
const { configureStore } = require("@reduxjs/toolkit");

const rootReducer = {
    gifts: giftReducer,
    products: productReducer,
    services: serviceReducer,
    user: userReducer,
}

const initialGiftState = {
    giftItems: loadGiftFromLocalStorage(),
}

const initialProductState = {
    productItems: loadProductsFromLocalStorage(),
}

const initialServiceState = {
    serviceItems: loadServicesFromLocalStorage(),
}

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['user/login', 'users/register'],
            },
        }).concat(localStorageMiddleware),
    preloadedState: {
        gifts: initialGiftState,
        products: initialProductState,
        services: initialServiceState,
    }
});

export default store;
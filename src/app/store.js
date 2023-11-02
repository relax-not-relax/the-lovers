import giftReducer from '../features/CreatePost/components/AddGift/giftSlice';
import productReducer from '../features/CreatePost/components/AddProduct/productSlice';
import serviceReducer from '../features/CreatePost/components/AddService/serviceSlice';
import userReducer from '../features/Auth/userSlice';
import cartReducer from '../features/Cart/cartSlice'
import { localStorageMiddleware } from './localStorageMiddleware';
import { loadCartFromLocalStorage, loadGiftFromLocalStorage, loadProductsFromLocalStorage, loadServicesFromLocalStorage } from './middleware';
const { configureStore } = require("@reduxjs/toolkit");

const rootReducer = {
    gifts: giftReducer,
    products: productReducer,
    services: serviceReducer,
    cart: cartReducer,
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

const initialCartState = {
    cartItems: loadCartFromLocalStorage(),
};

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['user/login', 'users/register', 'user/updateInformation', 'services/addScheduleToService'],
            },
        }).concat(localStorageMiddleware),
    preloadedState: {
        gifts: initialGiftState,
        products: initialProductState,
        services: initialServiceState,
        cart: initialCartState,
    }
});

export default store;
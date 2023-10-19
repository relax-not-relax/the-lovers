import giftReducer from '../features/CreatePost/components/AddGift/giftSlice';
import productReducer from '../features/CreatePost/components/AddProduct/productSlice';
import { localStorageMiddleware } from './localStorageMiddleware';
import { loadGiftFromLocalStorage, loadProductsFromLocalStorage } from './middleware';
const { configureStore } = require("@reduxjs/toolkit");

const rootReducer = {
    gifts: giftReducer,
    products: productReducer,
}

const initialGiftState = {
    giftItems: loadGiftFromLocalStorage(),
}

const initialProductState = {
    productItems: loadProductsFromLocalStorage(),
}

const store = configureStore({
    reducer: rootReducer,
    middleware: [localStorageMiddleware],
    preloadedState: {
        gifts: initialGiftState,
        products: initialProductState,
    }
});

export default store;
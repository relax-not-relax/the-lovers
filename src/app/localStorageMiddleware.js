import { addToPackage, removeFromPackage } from "../features/CreatePost/components/AddGift/giftSlice";
import { addToProductList, removeFromProductList } from "../features/CreatePost/components/AddProduct/productSlice";

// export const localStorageMiddleware = (store) => (next) => (action) => {
//     const currentState = store.getState();

//     if (
//         action.type === addToPackage.type ||
//         action.type === removeFromPackage.type
//     ) {
//         const updatedPackage = currentState.gifts.giftItems;
//         localStorage.setItem('gifts', JSON.stringify(updatedPackage));
//     }

//     return next(action);
// }

export const localStorageMiddleware = (store) => (next) => (action) => {
    const currentState = store.getState();

    // Danh sách các loại action liên quan đến gifts và products
    const giftActions = [addToPackage.type, removeFromPackage.type];
    const productActions = [addToProductList.type, removeFromProductList.type];

    if (giftActions.includes(action.type) || productActions.includes(action.type)) {
        let updatedData;

        if (giftActions.includes(action.type)) {
            // Nếu action liên quan đến gifts
            updatedData = currentState.gifts.giftItems;
            localStorage.setItem('gifts', JSON.stringify(updatedData));
        } else if (productActions.includes(action.type)) {
            // Nếu action liên quan đến products
            updatedData = currentState.products.productItems;
            localStorage.setItem('products', JSON.stringify(updatedData));
        }
    }

    return next(action);
}

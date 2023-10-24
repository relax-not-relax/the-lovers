import { addToPackage, removeFromPackage, removeGiftPackage } from "../features/CreatePost/components/AddGift/giftSlice";
import { addToProductList, removeFromProductList, removeProductList } from "../features/CreatePost/components/AddProduct/productSlice";
import { addScheduleToService, addToServiceList, removeFromServiceList, removeServiceSchedule } from "../features/CreatePost/components/AddService/serviceSlice";

export const localStorageMiddleware = (store) => (next) => (action) => {
    const currentState = store.getState();

    // Danh sách các loại action liên quan đến gifts, products, services
    const giftActions = [addToPackage.type, removeFromPackage.type, removeGiftPackage.type];
    const productActions = [addToProductList.type, removeFromProductList.type, removeProductList.type];
    const serviceActions = [addToServiceList.type, removeFromServiceList.type, addScheduleToService.type, removeServiceSchedule.type];

    if (giftActions.includes(action.type)
        || productActions.includes(action.type)
        || serviceActions.includes(action.type)) {
        let updatedData;

        if (giftActions.includes(action.type)) {
            updatedData = currentState.gifts.giftItems;
            localStorage.setItem('gifts', JSON.stringify(updatedData));
        } else if (productActions.includes(action.type)) {
            updatedData = currentState.products.productItems;
            localStorage.setItem('products', JSON.stringify(updatedData));
        } else if (serviceActions.includes(action.type)) {
            updatedData = currentState.services.serviceItems;
            localStorage.setItem('services', JSON.stringify(updatedData));
        }
    }

    return next(action);
}

import { createSlice } from "@reduxjs/toolkit";

const saveProductToLocalStorage = (products) => {
    localStorage.setItem('products', JSON.stringify(products));
};

const productSlice = createSlice({
    name: 'products',
    initialState: {
        productItems: [],
    },
    reducers: {
        addToProductList(state, action) {
            const newItem = action.payload;
            const productList = [...state.productItems];
            productList.push(newItem);
            state.productItems = productList;
            saveProductToLocalStorage(productList);
        },

        removeFromProductList(state, action) {
            // const productNeedToRemove = action.payload.productNeedToRemove;
            // const updatedProductList = [...state.productItems];
            // const newPackage = updatedProductList.filter((x) => x.productName !== productNeedToRemove);
            // state.productItems = newPackage;
            // saveProductToLocalStorage(newPackage);
            const { indexToRemove } = action.payload;
            if (indexToRemove >= 0 && indexToRemove < state.productItems.length) {
                const updatedProductList = [...state.productItems];
                updatedProductList.splice(indexToRemove, 1);
                state.productItems = updatedProductList;
                saveProductToLocalStorage(updatedProductList);
            }
        },

        removeProductList(state, action) {
            state.productItems = [];
            saveProductToLocalStorage([]);
        }

    }
});

const { actions, reducer } = productSlice;
export const { addToProductList, removeFromProductList, removeProductList } = actions;
export default reducer;
import { createSlice } from "@reduxjs/toolkit";

const saveGiftToLocalStorage = (gifts) => {
    localStorage.setItem('gifts', JSON.stringify(gifts));
};

const giftSlice = createSlice({
    name: 'gifts',
    initialState: {
        giftItems: [],
    },
    reducers: {
        addToPackage(state, action) {
            const newItem = action.payload;
            const updatedPackage = [...state.giftItems];
            updatedPackage.push(newItem);
            state.giftItems = updatedPackage;
            saveGiftToLocalStorage(updatedPackage);
        },

        removeFromPackage(state, action) {
            const giftNeedToRemove = action.payload.removeGift;
            const updatedPackage = [...state.giftItems];
            const newPackage = updatedPackage.filter((x) => x.giftName !== giftNeedToRemove);
            state.giftItems = newPackage;
            saveGiftToLocalStorage(newPackage);
        },

        removeGiftPackage(state, action) {
            state.giftItems = [];
            saveGiftToLocalStorage([]);
        }

    }
});

const { actions, reducer } = giftSlice;
export const { addToPackage, removeFromPackage, removeGiftPackage } = actions;
export default reducer;
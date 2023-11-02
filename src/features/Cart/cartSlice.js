import { createSlice } from "@reduxjs/toolkit";

const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        showMiniCart: false,
        cartItems: [],
    },
    reducers: {
        showMiniCart(state) {
            state.showMiniCart = true;
        },

        hideMiniCart(state) {
            state.showMiniCart = false;
        },

        addToCart(state, action) {
            //newItem = { id, product, quantity }
            const newItem = action.payload;
            const updatedCart = [...state.cartItems];
            //const index = updatedCart.findIndex((x) => x.id === newItem.id);
            updatedCart.push(newItem);
            state.cartItems = updatedCart;
            saveCartToLocalStorage(updatedCart);
        },

        removeFromCart(state, action) {
            const idNeedToRemove = action.payload.idNeedToRemove;
            const updatedCart = [...state.cartItems];
            const newCart = updatedCart.filter((x) => x.id !== Number.parseInt(idNeedToRemove));
            state.cartItems = newCart;
            saveCartToLocalStorage(newCart);
        }
    }
});

const { actions, reducer } = cartSlice;
export const { showMiniCart, hideMiniCart, addToCart, removeFromCart } = actions;
export default reducer;
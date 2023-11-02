import { createSelector } from '@reduxjs/toolkit';

const cartItemsSelector = (state) => state.cart.cartItems;

export const cartItemsCountSelector = createSelector(
    cartItemsSelector,
    (cartItems) => cartItems.length
);

export const cartTotalSelector = createSelector(
    cartItemsSelector,
    (cartItems) => cartItems.reduce(
        (total, item) => total + item.item.price, 0)
);

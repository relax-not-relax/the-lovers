export const loadGiftFromLocalStorage = () => {
    const gifts = localStorage.getItem('gifts');
    return gifts ? JSON.parse(gifts) : [];
};

export const loadProductsFromLocalStorage = () => {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
};
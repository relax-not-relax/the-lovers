export const loadGiftFromLocalStorage = () => {
    const gifts = localStorage.getItem('gifts');
    return gifts ? JSON.parse(gifts) : [];
};

export const loadProductsFromLocalStorage = () => {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
};

export const loadServicesFromLocalStorage = () => {
    const services = localStorage.getItem('services');
    return services ? JSON.parse(services) : [];
};

export const loadCartFromLocalStorage = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FeedIcon from '@mui/icons-material/Feed';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import React from 'react';


export const SidebarData = [
    {
        title: "News Feed",
        icon: <HomeIcon fontSize='large' />,
        link: "/feeds",
    },
    {
        title: "My Posts",
        icon: <FeedIcon fontSize='large' />,
        link: "/posts",
    },
    {
        title: "Create",
        icon: <AddCircleIcon fontSize='large' />,
        link: "/create",
    },
    {
        title: "My Orders",
        icon: <ShoppingCartCheckoutIcon fontSize='large' />,
        link: "/orders",
    },

]; 

import ChatIcon from '@mui/icons-material/Chat';
import FeedIcon from '@mui/icons-material/Feed';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AddCircleIcon from '@mui/icons-material/AddCircle';
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
        title: "My Orders",
        icon: <ShoppingBasketIcon fontSize='large' />,
        link: "/orders",
    },
    {
        title: "Notifications",
        icon: <NotificationsIcon fontSize='large' />,
        link: "/notifications",
    },
    {
        title: "Messages",
        icon: <ChatIcon fontSize='large' />,
        link: "/messages",
    },
    {
        title: "Create",
        icon: <AddCircleIcon fontSize='large' />,
        link: "/create",
    },

]; 

import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Badge, Box } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom';
import { logout } from '../../features/Auth/userSlice';
import { cartItemsCountSelector } from '../../features/Cart/selector';
import logo from '../../images/logo.png';
import { SidebarData } from './SidebarData';
import './style.scss';


function Sidebar() {

    // return (
    //     <Box>
    //         <div className='sideBar'>
    //             <img src={logo} alt="" width='85%' />

    //             <ul className='sideBarList'>
    //                 {SidebarData.map((val, key) => {
    //                     return (
    //                         <li key={key} className='row' id={window.location.pathname === val.link ? "active" : ""} onClick={() => {
    //                             window.location.pathname = val.link;
    //                         }}>
    //                             <div className='icon'>{val.icon}</div>
    //                             <div className='title'>
    //                                 {val.title}
    //                             </div>
    //                         </li>
    //                     )
    //                 })}
    //             </ul>
    //         </div>
    //     </Box>
    // );

    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const cartItemsCount = useSelector(cartItemsCountSelector);

    const handleLogout = () => {
        const action = logout();
        dispatch(action);
        history.push('/login');
        window.location.reload();
    };

    const handleCartClick = () => {
        history.push('/cart');
    };

    return (
        <Box>
            <div className='sideBar'>
                <img src={logo} alt="" width='85%' />

                <ul className='sideBarList'>
                    {SidebarData.map((val, key) => {
                        const isActive = location.pathname === val.link || location.pathname.startsWith(val.link);

                        return (
                            <li
                                key={key}
                                className='row'
                                //className={`row ${isActive ? 'active' : ''}`}
                                id={isActive ? 'active' : ''}
                                onClick={() => {
                                    history.push(`${val.link}`);
                                }}
                            >
                                <div className='icon'>{val.icon}</div>
                                <div className='title'>{val.title}</div>
                            </li>
                        );
                    })}
                    <li className='row' onClick={handleCartClick}>
                        <div className='icon'>
                            <Badge badgeContent={cartItemsCount} color="error">
                                <ShoppingBasketIcon fontSize='large' />
                            </Badge>
                        </div>
                        <div className='title'>Cart</div>
                    </li>
                    <li className='row' style={{ marginTop: '180px' }} onClick={handleLogout}>
                        <div className='icon'>
                            <LogoutIcon />
                        </div>
                        <div className='title'>Logout</div>
                    </li>
                </ul>
            </div>
        </Box>
    );
}

export default Sidebar;
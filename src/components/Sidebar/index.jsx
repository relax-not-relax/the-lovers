import { Box } from '@mui/material';
import React from 'react';
import logo from '../../images/logo.png';
import LogoutIcon from '@mui/icons-material/Logout';
import { SidebarData } from './SidebarData';
import './style.scss';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/Auth/userSlice';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';


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

    const handleLogout = () => {
        const action = logout();
        dispatch(action);
        history.push('/login');
        window.location.reload();
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
                    <li className='row' style={{ marginTop: '120px' }} onClick={handleLogout}>
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
import { Box } from '@mui/material';
import React from 'react';
import logo from '../../images/logo.png';
import { SidebarData } from './SidebarData';
import './style.scss';

function Sidebar() {

    return (
        <Box>
            <div className='sideBar'>
                <img src={logo} alt="" width='85%' />

                <ul className='sideBarList'>
                    {SidebarData.map((val, key) => {
                        return (
                            <li key={key} className='row' id={window.location.pathname === val.link ? "active" : ""} onClick={() => {
                                window.location.pathname = val.link;
                            }}>
                                <div className='icon'>{val.icon}</div>
                                <div className='title'>
                                    {val.title}
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </Box>
    );
}

export default Sidebar;
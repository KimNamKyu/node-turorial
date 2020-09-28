import React from 'react';
import LeftMenu from './LeftMenu'
import RightMenu from './RightMenu'
import './Navbar.css';

function NavBar(props) {
    return (
        <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
            <div className="menu__logo">
                <a href="/">Logo</a>
            </div>
            <div className="menu__container">
                <div className="menu_left">
                    <LeftMenu mode="horizontal" />
                </div>
                <div className="menu_rigth">
                    <RightMenu mode="horizontal" />
                </div>
            </div>
        </nav>
    )
}

export default NavBar
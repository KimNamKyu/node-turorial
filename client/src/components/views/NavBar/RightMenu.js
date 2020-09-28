import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {
    const user = useSelector(state => state.user)

    const onLogoutHandler = (e) => {
        axios.get('/api/users/logout')
            .then(response => {
                if (response.data.success) {
                    props.history.push('/login')
                } else {
                    alert('로그아웃 실패')
                }
            })
    }

    
    if (user.userData && !user.userData.isAuth) {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="Signin">
                    <a href="/login">Sign in</a>
                </Menu.Item>
                <Menu.Item key="Signup">
                    <a href="/register">Sign up</a>
                </Menu.Item>
            </Menu>
        )
    } else {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="list">
                    <a href="/board">board</a>
                </Menu.Item>
                <Menu.Item key="logout">
                    <a onClick={onLogoutHandler}>Log out</a>
                </Menu.Item>
            </Menu>
        )
    }
}

export default withRouter(RightMenu)
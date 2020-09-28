import React from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function LandingPage(props) {
    const user = useSelector(state => state.user)

    // useEffect(() => {
    //     axios.get('/api/hello') //cors(보안문제) => proxy로 해결 
    //     .then(resoponse => console.log(resoponse.data))
    // }, [])

    const onLogoutHandler = (e) => {
        axios.get('/api/users/logout')
        .then(response => {
            if(response.data.success){
                props.history.push('/login')
            }else{
                alert('로그아웃 실패')
            }
        })
    }

    if(user.userData && user.userData.isAuth){
        return (
            <div style={{
                display:'flex', justifyContent:'center', alignItems:'center'
                , width:'100%', height:'100vh'
            }}>
                시작페이지
                <button onClick={onLogoutHandler}>
                    로그아웃
                </button>
            </div>
        )
    }else{
        return (
            <div style={{
                display:'flex', justifyContent:'center', alignItems:'center'
                , width:'100%', height:'100vh'
            }}>
                시작페이지
            </div>
        )
    }
    
}

export default withRouter(LandingPage)
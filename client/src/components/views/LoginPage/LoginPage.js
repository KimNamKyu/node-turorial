import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {loginUser} from '../../../_actions/user_action'
function LoginPage(props) {
    const dispatch = useDispatch();
    //State 만들자    
    const [Email, setEmail] = useState("")    
    const [Password, setPassword] = useState("")

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value)
    }
    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value)
    }
    const onSubminHandler = (e) => {
        e.preventDefault(); 

        let body = {
            email:Email,
            password: Password
        }

        //redux 사용
        dispatch(loginUser(body))
            .then(response => {
                console.log(response)
                if(response.payload.loginSucess) {
                    props.history.push('/')
                }else{
                    alert(response.payload.message)
                }
            })
        
        // Axios.post('/api/user/login', body)
        // .then(response => {

        // })
    }
    return (
        <div style={{
            display:'flex', justifyContent:'center', alignItems:'center'
            , width:'100%', height:'100vh'
        }}>

            <form style={{display:'flex', flexDirection:'column'}}
                onSubmit={onSubminHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>

                <br/>
                <button>
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage
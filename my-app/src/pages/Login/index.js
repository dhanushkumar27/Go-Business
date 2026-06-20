import {useState} from 'react'
import Cookies from 'js-cookie'
import {Navigate} from 'react-router-dom'

import './index.css'

const Login = (props) =>{
    const {navigate} = props
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [showError,setShowError] = useState(false)
    const [errorText,setErrorText] = useState("")
    const onSubmitForm = async (event) =>{
        event.preventDefault()
        const url = "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin"
        const userDetails = {email,password}
        const options = {
            method:'POST',
            body:JSON.stringify(userDetails)
        }
        const response = await fetch(url,options)
        const result = await response.json()
        if(result.success){
            const {data} = result 
            const {token} = data
            Cookies.set("jwt_token",token,{expires:30,path:"/"})
            navigate("/", {replace:true})

        }else{
            setShowError(true)
            setErrorText(result.message)
        }
    }

    if(Cookies.get("jwt_token")){
        return <Navigate to="/"/>
    }

    return(
        <div className='login-page'>
            <form className='login-form' onSubmit={onSubmitForm}>
                <h1 className='login-form-heading'>Go Business</h1>
                <p className='login-form-text'>Sign in to open your referral dashboard.</p>

                <label className='login-form-label' htmlFor='email'>Email</label>
                <input className='login-form-input' id="email" type="text" value={email} onChange={(event)=>setEmail(event.target.value)} placeholder="you@example.com"/>

                <label className='login-form-label' htmlFor='password'>Password</label>
                <input className='login-form-input' id="password" type="password" value={password} onChange={(event)=>setPassword(event.target.value)} placeholder="Enter Password"/>

                <button className='login-form-button' type="submit">Sign in</button>

                {showError && <p className='login-form-error-text'>{errorText}</p>}
            </form>
        </div>
    )
}

export default Login
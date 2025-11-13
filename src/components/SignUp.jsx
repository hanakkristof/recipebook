import { updateProfile } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebaseApp'
import { useContext } from 'react'
import { MyUserContext } from '../context/MyUserProvider'
import { data, useNavigate } from 'react-router'
import { useEffect } from 'react'
import { useState } from 'react'
import { MyToastify } from './MyToastify'

const SignUp = () => {
  const [loading, setLoading] = useState(false)

  const {signUpUser, msg,logOutUser,verified, setVerified}=useContext(MyUserContext)
  console.log(msg);
  
  const navigate = useNavigate()
  
  const handleSubmit = async (event)=>{
    event.preventDefault()
    setLoading(true)
    try {
      const data = new FormData(event.currentTarget)
    //console.log(data.get("email"), data.get("password"),data.get("displayName"));
    await signUpUser(data.get("email"), data.get("password"),data.get("displayName"))
    event.currentTarget.reset()
    } catch (error) {
      console.log(error);
      
    }finally{
      setLoading(false)
    }
    
    //logOutUser()
  //navigate("/recipes")
  }




  

  return (
    <div style={{minHeight:"100vh",backgroundColor:"var(--primary)", position:"relative", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
      <form action="" onSubmit={handleSubmit} style={{border:"var(--background), solid, 3px",color:'var(--background)', display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:"15px",backgroundColor:"var(--secondary)", padding:"15px", borderRadius:"10px" }}>
        <h1>Regisztrálj!</h1>
        <span style={{display:"flex", justifyContent:"space-between", gap:"5px"}}>
        <label htmlFor="nev">Email:</label>
        <input name='email' type="email" id='email'/></span>
        <span style={{display:"flex", justifyContent:"space-between", gap:"5px"}}>
            <label htmlFor="user">Felhasználónév:</label>
            <input name='displayName' type="text" id='user'/>
        </span>
        <span  style={{display:"flex", justifyContent:"space-between", gap:"5px"}}>
        <label htmlFor="pass">Jelszó:</label>
        <input name='password' type="password" id='pass'/>
        </span>
        <button id='register' disabled={loading}>{loading ? "Regisztráció folyamatban..." : "Regisztrálás"}</button>
      </form>
      {msg &&(msg?.err || msg?.signUp ) && <p className='errormsg'>{msg?.err || msg?.signUp}</p>}
      {msg && <MyToastify {...msg}/>}
    </div>
  )
}

export default SignUp

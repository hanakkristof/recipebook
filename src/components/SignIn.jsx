import React from 'react'
import { useContext } from 'react'
import { MyUserContext, MyUserProvider } from '../context/MyUserProvider'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'


const SignIn = () => {
  const { signInUser, msg } = useContext(MyUserContext)
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log(data.get("email"), data.get("password"));
    //firebase-backend fgv. meghívása
    signInUser(data.get("email"), data.get("password"))
    //navigate("/recipes")  

  }

  useEffect(() => {
    { msg && msg?.signIn && navigate("/recipes") }
  }, [msg])

  return (
    <div style={{ gap:"5px",minHeight: "100vh", backgroundColor: "var(--primary)", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <form onSubmit={handleSubmit} style={{ border: "var(--background), solid, 3px", color: 'var(--background)', display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "15px", backgroundColor: "var(--secondary)", padding: "15px", borderRadius: "10px" }}>
        <h1>Jelentkezz Be!</h1>
        <span className='form-row'>
          <label htmlFor="email">Email:</label>
          <input name='email' type="email" id='email' /></span>
        <span className='form-row'>
          <label htmlFor="pass">Jelszó:</label>
          <input name='password' type="password" id='pass' />
        </span>
        <button>Bejelentkezés</button>
      </form>
      <div className='error'>
        {msg && msg?.err && <p className='errormsg'>{msg.err}</p>}
        
      </div>
      <div><a href="#" onClick={()=>navigate("/pwreset")}>Elfelejtett Jelszó?</a></div>
    </div>

  )
}

export default SignIn

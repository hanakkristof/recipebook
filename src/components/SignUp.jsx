import React from 'react'

const SignUp = () => {
  return (
    <div style={{minHeight:"100vh",backgroundColor:"var(--primary)", position:"relative", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
      <form action="" style={{border:"var(--background), solid, 3px",color:'var(--background)', display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:"15px",backgroundColor:"var(--secondary)", padding:"15px", borderRadius:"10px" }}>
        <h1>Jelentkezz Be!</h1>
        <span style={{display:"flex", justifyContent:"space-between", gap:"5px"}}>
        <label htmlFor="nev">Email:</label>
        <input type="email" id='email'/></span>
        <span style={{display:"flex", justifyContent:"space-between", gap:"5px"}}>
            <label htmlFor="user">Felhasználónév:</label>
            <input type="text" id='user'/>
        </span>
        <span  style={{display:"flex", justifyContent:"space-between", gap:"5px"}}>
        <label htmlFor="pass">Jelszó:</label>
        <input type="password" id='pass'/>
        </span>
        <button>Bejelentkezés</button>
      </form>
    </div>
  )
}

export default SignUp

import React from 'react'
import { useContext } from 'react'
import { FaHome } from 'react-icons/fa'
import { useNavigate } from 'react-router'
import { MyUserContext } from '../context/MyUserProvider'
import { RxAvatar } from 'react-icons/rx'

const MyHeader = () => {
  const {user, logOutUser,verified} = useContext(MyUserContext)
  console.log(user);
  
    const navigate = useNavigate()
  return (
    
    <div className='totallyborderbottom' style={{position:"fixed",left:"0",top:"0", zIndex:"1000",width:"100vw", backgroundColor:"var(--primary )", height:"65px"}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", height:"100%", padding:"20px"}}>
        <FaHome className='icons' size={30} onClick={()=>navigate("/")} />
          
        {user ? 
        
        <div style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"5px"}}>
        
        <span onClick={()=>navigate("/user")}>
          {user?.photoURL ? <img style={{width:"50px", height:"50px",borderRadius:"50%", objectFit:"cover"}} src={user.photoURL} alt="" /> : <RxAvatar size={40} title={user.displayName} />}
        
        </span>
        
        <button onClick={()=>logOutUser() && navigate("/recipes")} >Kijelentkezés</button>
      </div>  
      :
      <div style={{display:"flex", gap:"5px"}}>
          <button onClick={() => navigate("/signin")}>Sign In</button>
          <button onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      }
        
      </div>
    </div>
  )
}

export default MyHeader

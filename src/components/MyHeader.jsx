import React from 'react'
import { useContext } from 'react'
import { FaHome } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router'
import { MyUserContext } from '../context/MyUserProvider'
import { RxAvatar } from 'react-icons/rx'
import { FaBowlFood } from 'react-icons/fa6'
import { useState } from 'react'
import { useEffect } from 'react'

const MyHeader = () => {
  const { user, logOutUser, verified } = useContext(MyUserContext)
  const location = useLocation()
  const isHome = location.pathname == "/"
  const isRecipe = location.pathname == "/recipes"
  console.log(user);





  const navigate = useNavigate()
  return (

    <div className='totallyborderbottom' style={{ position: "fixed", left: "0", top: "0", zIndex: "1000", width: "100vw", backgroundColor: "var(--primary )", height: "65px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%", padding: "20px" }}>
        <span style={{ display: "flex", gap: "5px" }}>
          {!isHome && <FaHome className='icons' size={30} onClick={() => navigate("/")} />}
          {!isHome && !isRecipe && <FaBowlFood className='icons' size={30} onClick={() => navigate("/recipes")} />}
        </span>
        {isRecipe && <span>
           <button className='addBtnHead'  disabled={!user} onClick={()=>navigate("/addnew")} >Recept hozzáadása</button>
        </span>}
            
        {user ?
          
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>

            <span onClick={() => navigate("/user")}>
              {user?.photoURL ? <img className='pfp' style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }} src={user.photoURL} alt="" /> : <RxAvatar size={40} title={user.displayName} />}

            </span>

            <button onClick={() => logOutUser() && navigate("/recipes")} >Kijelentkezés</button>
          </div>
          :
          <div style={{ display: "flex", gap: "5px" }}>
            <button onClick={() => navigate("/signin")}>Sign In</button>
            <button onClick={() => navigate("/signup")}>Sign Up</button>
          </div>
        }

      </div>
    </div>
  )
}

export default MyHeader

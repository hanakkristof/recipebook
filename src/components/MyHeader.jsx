import React from 'react'
import { useNavigate } from 'react-router'

const MyHeader = () => {
    const navigate = useNavigate()
  return (
    <div>
      <div style={{display:"flex", justifyContent:"space-between"}}>
        <div>

        </div>
        <div style={{display:"flex", gap:"5px"}}>
        <button onClick={() => navigate("/signin")}>Sign In</button>
        <button onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      </div>
    </div>
  )
}

export default MyHeader

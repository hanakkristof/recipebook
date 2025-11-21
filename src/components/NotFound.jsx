import React from 'react'
import { useNavigate } from 'react-router'

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div style={{display:"flex", width:"30vw", height:"30vh", alignItems:"center", justifyContent:"center", }}>
          <div style={{flexDirection:"column", gap:"20px",borderRadius:"30px",boxShadow:"2px 6px 10px 3px var(--background)",border:"3px solid var(--background)",flex:"1", textAlign:"center", height:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
      <h1 style={{fontStyle:"italic", fontWeight:"bold", color:"var(--disabled)",  WebkitTextStrokeWidth:"clamp(1px, 0.2vw, 3px)", WebkitTextStrokeColor:"var(--background)",textShadow:"3px 3px 8px var(--background)", fontSize:"clamp(1rem, 10vw,4rem)"}}>404: not found</h1>
      <button onClick={navigate("/recipes")}>
          Back to Home
      </button>
    </div>
    </div>

  )
}

export default NotFound

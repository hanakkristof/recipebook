import React from 'react'
import { useNavigate } from 'react-router'
import MyHeader from '../components/MyHeader'

export const Home = () => {
  const navigate = useNavigate()
  return (
    <div className='homeCont'>
      
      <div className='myHome' style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"15px"}}>
        <h1 style={{color:"var(--primary)"}}>Recipe Book</h1>
        <button onClick={() => navigate("/recipes")}>Főzz, posztolj, inspirálj !</button>
      </div>

    </div>
  )
}

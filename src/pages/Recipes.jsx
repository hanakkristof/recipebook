import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {FaHome} from "react-icons/fa"
import { useNavigate, useParams } from 'react-router'
import { readRecipes } from '../mybackend'
import { RecipeCard } from '../components/RecipeCard'
import { useContext } from 'react'
import { MyUserContext } from '../context/MyUserProvider'
export const Recipes = () => {
  
    const {user} = useContext(MyUserContext)
    console.log(user);
  const [recipes,setRecipes] = useState(null)
  const [loading, setLoading] = useState(false)


  const navigate = useNavigate()
  
  
  useEffect(()=>{
    readRecipes(setRecipes, setLoading)
  },[])
  console.log(recipes);
  
  return (
    <div style={{minHeight:"100vh",backgroundColor:"var(--primary)", position:"relative",padding:"20px", width:"100vw"}}>
      <div style={{textAlign:"center", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", flexWrap:"wrap", gap:"15px", color:"var(--background)"}}>
        {recipes && recipes.length>0 && recipes.map(obj=><RecipeCard key={obj.id}{...obj}/>)}
        {recipes && recipes.length == 0 && <h4>Nincsenek receptek feltöltve.</h4>}
        
      </div>
      
        <button onClick={()=>navigate("/addnew")} style={{position:"absolute", bottom:"5px", right:"5px"}}>Recept hozzáadása</button>
    </div>
  )}
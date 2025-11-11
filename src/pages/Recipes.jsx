import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {FaHome} from "react-icons/fa"
import { useNavigate, useParams } from 'react-router'
import { readRecipes } from '../mybackend'
import { RecipeCard } from '../components/RecipeCard'
export const Recipes = () => {
 
  const [recipes,setRecipes] = useState([])


  const navigate = useNavigate()
  
  
  useEffect(()=>{
    readRecipes(setRecipes)
  },[])
  console.log(recipes);
  
  return (
    <div style={{minHeight:"100vh",backgroundColor:"var(--primary)", position:"relative"}}>
      <div style={{textAlign:"center", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"row", flexWrap:"wrap", gap:"15px", color:"var(--background)"}}>
        {recipes && recipes.length>0 && recipes.map(obj=><RecipeCard key={obj.id}{...obj}/>)}
        {recipes && recipes.length == 0 && <h4>Nincsenek receptek feltöltve.</h4>}
      </div>
      <FaHome size={30} onClick={()=>navigate("/")} style={{position:"absolute",color:"var(--background)", top:"5px", left:"5px"}}/>
        <button onClick={()=>navigate("/addnew")} style={{position:"absolute", bottom:"5px", right:"5px"}}>Recept hozzáadása</button>
    </div>
  )}
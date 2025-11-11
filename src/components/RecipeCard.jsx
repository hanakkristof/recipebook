import React from 'react'
import { MdDeleteForever } from 'react-icons/md'
import { deleteRecipe } from '../mybackend'
import { CiEdit } from 'react-icons/ci'
import { useNavigate } from 'react-router'

export const RecipeCard = ({id,name,lepesek,ingredients,url,delete_url}) => {
     const navigate = useNavigate()
     console.log(id);
  return (
    <div style={{ padding:"15px", height:"760px", border:"2px solid var(--background)",borderRadius:"15px", maxWidth:"500px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
      <h1 style={{fontWeight:"bold", textDecoration:"underline"}}>{name}</h1>
        <div style={{display:"flex", flexWrap:"wrap", gap:"10px", flexDirection:"row", alignItems:"center", justifyContent:"center", textAlign:"center", paddingTop:"15px"}}>{ingredients.map(obj=><p style={{border:"2px, solid, var(--background)", borderRadius:"5px", backgroundColor:"var(--secondary)" ,textTransform:"capitalize"}}>{obj}</p>)}</div>
      <img src={url} alt={name} style={{maxWidth:"450px", padding:"15px", borderRadius:"10px", border:"2px,solid,var(--background)"}} />
        <div style={{display:"flex",overflow:"hidden", border:"2px,solid,var(--background)",borderRadius:"5px", padding:"5px", backgroundColor:"var(--secondary)", alignItems:"center", justifyContent:"center"}}>
            {lepesek}
        </div>
      <div style={{ width:"100%", padding:"5px",display:"flex", alignItems:"center", justifyContent:"space-between"}}>
      <MdDeleteForever size={30} onClick={()=>deleteRecipe(id,delete_url)}/>
          <CiEdit size={30} onClick={()=>navigate("/edit/"+id)}/>
            </div>
    </div>
  )
}


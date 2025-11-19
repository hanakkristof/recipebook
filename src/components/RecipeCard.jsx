import React from 'react'
import { MdDeleteForever } from 'react-icons/md'
import { deleteRecipe } from '../mybackend'
import { CiEdit } from 'react-icons/ci'
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import { MyUserContext } from '../context/MyUserProvider'

export const RecipeCard = ({id,name,lepesek,ingredients,url,delete_url, dname, uid, category}) => {
   const {user} =useContext(MyUserContext)
     const navigate = useNavigate()
     console.log(id, dname, uid);
  return (
    <div style={{ gap:"5px",padding:"15px", maxWidth:"500px", border:"2px solid var(--background)",borderRadius:"15px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
      <h1 style={{fontWeight:"bold", textDecoration:"underline"}}>{name}</h1>
      <h5><span>Uploaded by: {dname}</span></h5>
        <div style={{display:"flex", flexWrap:"wrap", gap:"10px", flexDirection:"row", alignItems:"center", justifyContent:"center", textAlign:"center", paddingTop:"15px"}}>{ingredients.map(obj=><p style={{border:"2px, solid, var(--background)",padding:"2px", borderRadius:"5px", backgroundColor:"var(--secondary)" ,textTransform:"capitalize"}}>{obj}</p>)}</div>
      <img src={url} alt={name} style={{maxWidth:"450px", padding:"15px", borderRadius:"10px", border:"2px,solid,var(--background)"}} />
        <div style={{maxWidth:"450px",maxHeight:"400px", overflowY:"auto",   border:"2px,solid,var(--background)",borderRadius:"5px", padding:"10px", backgroundColor:"var(--secondary)", alignItems:"center", justifyContent:"center"}}>
            {lepesek}
        </div>
        <div>
          <p style={{border:"2px, solid, var(--background)", borderRadius:"5px", backgroundColor:"var(--secondary)" ,textTransform:"capitalize", padding:"3px"}}>{category}</p>
        </div>
      
        {user && user.uid==uid &&  <div style={{ width:"100%", padding:"5px",display:"flex", alignItems:"center", justifyContent:"space-between"}}> <MdDeleteForever size={30} onClick={()=>deleteRecipe(id,delete_url)}/><CiEdit size={30} onClick={()=>navigate("/edit/"+id)}/></div>}
      
          
          
            
    </div>
  )
}


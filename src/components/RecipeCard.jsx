import React from 'react'
import { MdDeleteForever } from 'react-icons/md'
import { deleteRecipe } from '../mybackend'
import { CiEdit } from 'react-icons/ci'
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import { MyUserContext } from '../context/MyUserProvider'
import { FaMinus, FaMinusCircle } from 'react-icons/fa'

export const RecipeCard = ({id,name,lepesek,ingredients,url,delete_url, dname, uid, category, userPhoto}) => {
   const {user} =useContext(MyUserContext)
     const navigate = useNavigate()
     console.log(id, dname, uid);


  return (
    <div className='recept' style={{backgroundColor:"var(--primary)", gap:"12px",padding:"15px", maxWidth:"clamp(250px, 50vw, 500px)", border:"2px solid var(--background)",borderRadius:"15px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
      <h1 style={{fontWeight:"bold", textDecoration:"underline"}}>{name}</h1>
      <h5><span style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"15px"}}>Uploaded by: {dname} {userPhoto && <img style={{objectFit:"cover", aspectRatio:"1/1",width:"50px", height:"50px",borderRadius:"50%", objectFit:"cover"}} src={userPhoto} alt="profilkép" />}</span></h5>
        <div style={{display:"flex", flexWrap:"wrap",fontSize:"clamp(0.8rem, 3vw, 1rem)", gap:"10px", flexDirection:"row", alignItems:"center", justifyContent:"center", textAlign:"center", paddingTop:"15px"}}>{ingredients.map(obj=> <p style={{border:"2px, solid, var(--background)",padding:"2px", borderRadius:"5px", backgroundColor:"var(--secondary)" ,textTransform:"capitalize"}}>{obj}</p>)}</div>
      <img src={url} alt={name} style={{maxWidth:"clamp(200px,40vw,450px)", padding:"15px", borderRadius:"10px", border:"2px,solid,var(--background)"}} />
        <div style={{maxWidth:"450px",maxHeight:"400px", overflowY:"auto",   border:"2px,solid,var(--background)",borderRadius:"5px", padding:"10px", backgroundColor:"var(--secondary)", alignItems:"center", justifyContent:"center"}}>
            {lepesek} 
        </div>
        <div>
          <p style={{border:"2px, solid, var(--background)",fontSize:"clamp(0.8rem, 3vw, 1rem)", borderRadius:"5px", backgroundColor:"var(--secondary)" ,textTransform:"capitalize", padding:"3px"}}>{category}</p>
        </div>
      
        {user && user.uid==uid &&  <div style={{ width:"100%", padding:"5px",display:"flex", alignItems:"center", justifyContent:"space-between"}}> <MdDeleteForever className='icons' size={30} onClick={()=>deleteRecipe(id,delete_url)}/><CiEdit className='icons' size={30} onClick={()=>navigate("/edit/"+id)}/></div>}
      
          
          
            
    </div>
  )
}


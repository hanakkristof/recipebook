import React from 'react'
import { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import { useNavigate } from 'react-router'
import { addRecipe } from '../mybackend'

export const RecipesForm = () => {
  const [name, setName] = useState("")
  const [ingredients, setIngredients] = useState([""])
  const [lepesek, setLepesek] = useState("")
  const [category, setCategory] = useState("")
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  console.log(file);
  
  const navigate = useNavigate()
  const handleSubmit = async (e)=>{
    e.preventDefault()
    setLoading(true)

    let inputData = {name, ingredients, lepesek, category}
    console.log(inputData);
    await addRecipe(inputData, file)
    console.log("recept elmentve");
    setLoading(false)

    
  }

  const handleChangeIngredients=(index, value)=>{
    const newIngredients = [...ingredients]
    newIngredients[index] = value
    setIngredients(newIngredients)
    
  }

  const handleFileChange =(e)=>{
    const selected = e.target.files[0];
    setFile(selected)
    if (selected) {
      setPreview(URL.createObjectURL(selected))
    }
  }
  
  return (
    <div style={{minHeight:"100vh",backgroundColor:"var(--primary)", position:"relative", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
      <form onSubmit={handleSubmit} style={{border:"var(--background), solid, 3px",color:'var(--background)', display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:"15px",backgroundColor:"var(--secondary)", padding:"15px", borderRadius:"10px" }}>
        <h1 style={{textAlign:"center"}}>Új recept feltöltése</h1>
        <input type="text" placeholder='receptneve' value={name} onChange={(e)=>setName(e.target.value)} required/>
        <div style={{display:"flex", flexDirection:"column", gap:"3px", alignItems:"center"}}>{ingredients.map((item, index) =>
          <div key={index}>
            <input type="text" value={item} onChange={(e)=>handleChangeIngredients(index, e.target.value)} placeholder={`${index+1}. hozzávaló: `}/>
          </div>
        )}
        <FaPlus onClick={()=>setIngredients([...ingredients, ""])} style={{textAlign:"center", border:"1px, var(--background), solid", borderRadius:"2px", maxWidth:"20px"}}/></div>
          <textarea style={{resize:"none", maxWidth:"250px", height:"50px"}} value={lepesek} onChange={(e)=>setLepesek(e.target.value)} placeholder='Elkészítés lépései' required></textarea>
          <input type="text"value={category} onChange={(e)=>setCategory(e.target.value)} placeholder='Kategória' required />
          <input type="file" accept='image/*' onChange={handleFileChange}/>
          {preview && <img src={preview} alt='Előnézet' style={{maxHeight:"200px", objectFit:"cover"}} />}
          <button type='submit'>Mentés</button>
      </form>
      {loading && <div>loading...</div>}
      <IoMdClose onClick={()=>navigate("/recipes")} style={{color:'var(--background)',position:"absolute", top:"5px", left:"5px",fontSize:"2rem", border:"3px solid var(--background)", borderRadius:"5px"}}/>
    </div>
  )
}



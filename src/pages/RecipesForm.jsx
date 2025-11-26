import React from 'react'
import { useState } from 'react'
import { FaMinusCircle, FaPlus } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import { useNavigate, useParams } from 'react-router'
import { addRecipe, readRecipe, updateRecipe } from '../mybackend'
import { useEffect } from 'react'
import { useContext } from 'react'
import { MyUserContext } from '../context/MyUserProvider'

export const RecipesForm = () => {
  const { user } = useContext(MyUserContext)
  const [name, setName] = useState("")
  const [ingredients, setIngredients] = useState([""])
  const [lepesek, setLepesek] = useState("")
  const [category, setCategory] = useState("")
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [recipe, setRecipe] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    console.log(id);
    console.log(recipe);

    if (id) {
      readRecipe(id, setRecipe)

    }
  }, [id])
  console.log(recipe);

  useEffect(() => {

    if (recipe) {
      setName(recipe.name)
      setCategory(recipe.category)
      setIngredients(recipe.ingredients)
      setLepesek(recipe.lepesek)
      setPreview(recipe.url)

    }
  }, [recipe])


  const navigate = useNavigate()
  //
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)


    let inputData = { name, ingredients, lepesek, category, uid: user.uid, dname: user.displayName, userPhoto:user.photoURL }
    console.log(inputData);

    if (id) {
      await updateRecipe(id, !file ? { ...inputData, url: recipe.url, delete_url: recipe.delete_url } : inputData, file)
    } else {

      await addRecipe(inputData, file)
    }
    setName("")
    setCategory("")
    setLepesek("")
    setIngredients([""])
    setFile(null)
    console.log("recept elmentve");
    setLoading(false)
    navigate("/recipes")

  }

  const handleChangeIngredients = (index, value) => {
    const newIngredients = [...ingredients]
    newIngredients[index] = value
    setIngredients(newIngredients)

  }

  const removeIngredientField = (index) => {
    console.log(index);
    const newArr = ingredients.filter((item, idx) => index != idx)
    setIngredients([...newArr])

  }

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected)
    if (selected) {
      setPreview(URL.createObjectURL(selected))
    }
  }

  return (
    <div style={{ minHeight: "calc(100vh - 65px)", width: "100vw", backgroundColor: "var(--primary)", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <form onSubmit={handleSubmit} style={{ border: "var(--background), solid, 3px", color: 'var(--background)', display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "15px", backgroundColor: "var(--secondary)", padding: "15px", borderRadius: "10px" }}>
        <h1 style={{ textAlign: "center", fontWeight: "bold" }}>Új recept feltöltése</h1>
        <input className='inputtext' type="text" placeholder='recept neve' value={name} onChange={(e) => setName(e.target.value)} required />
        <div style={{ display: "flex", flexDirection: "column", padding: "0px", width: "100%", gap: "3px", alignItems: "center" }}>{ingredients.map((item, index) =>

          <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "5px" }} key={index}>
            <FaMinusCircle onClick={() => removeIngredientField(index)} />
            <input className='inputtext' type="text" value={item} onChange={(e) => handleChangeIngredients(index, e.target.value)} required placeholder={`${index + 1}. hozzávaló: `} />
          </div>
        )}
          <FaPlus size={25} className='addButton' onClick={() => setIngredients([...ingredients, ""])} style={{ textAlign: "center", borderRadius: "2px", maxWidth: "25px" }} /></div>
        <textarea style={{ resize: "none", width: "100%", minHeight: "50px", maxHeight: "100px" }} value={lepesek} onChange={(e) => setLepesek(e.target.value)} placeholder='Elkészítés lépései' required></textarea>
        <input className='inputtext' type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Kategória' required />
        <label htmlFor="file-upload" className='custom-file-upload'>Upload</label>
        <input id='file-upload' className='inputtext fileinput' type="file" accept='image/*' onChange={handleFileChange} />
        {preview && <img src={preview} alt='Előnézet' style={{ maxHeight: "200px", objectFit: "cover" }} />}
        <button id="submit-button" type='submit' disabled={loading || (!file && !preview)}>Mentés</button>
      </form>
      {loading && <div style={{ color: "var(--accent)" }}>loading...</div>}
      <IoMdClose className='deleteButton' onClick={() => navigate("/recipes")} style={{  position: "absolute", top: "5px", left: "5px", fontSize: "2rem", borderRadius: "5px" }} />
    </div>
  )
}



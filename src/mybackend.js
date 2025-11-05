import axios from "axios";
import { RecipesForm } from "./pages/RecipesForm";
import { addDoc, collection, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "./firebaseApp"
import imageCompression from "browser-image-compression";

const apikey = import.meta.env.VITE_IMGBB_API_KEY
const imgbburl = "https://api.imgbb.com/1/upload?key=" + apikey 

const uploadToIMGBB = async(file)=>{
    const myFormData = new FormData()
    myFormData.append("image",file)
    try {
        const response = await axios.post(imgbburl,myFormData)
        const {url,delete_url} = response.data.data

        return {url,delete_url}
    } catch (error) {
        console.log("Képfeltöltési hiba " + error);
        
    }
}

export const addRecipe= async(recipe, file)=>{
    try {
        let imgUrl = ""
        let deleteUrl =""
        //KICSINÍT
        const compressed = await imageCompression(file,{maxWidthOrHeight:800, useWebWorker:true})
        const result = await uploadToIMGBB(compressed)
        if (result) {
            imgUrl = result.url
            deleteUrl = result.delete_url
            const {url, delete_url} = await uploadToIMGBB(file)
        const collectionref = collection(db, "recipes")
        await addDoc(collectionref, {...recipe, url, delete_url, timestamp:serverTimestamp()})
        }
       
    } catch (error) {
        console.log("Nem sikerült hozzáadni! " +error);
        
    }
}
import axios from "axios"
import imageCompression from "browser-image-compression"
//const API_URL= "http://localhost:5000/api/"
const API_URL = "https://recipesbackend.vercel.app/api/" //https://recipesbackend.vercel.app/   
const convertToBase64 =(file)=>{
    return new Promise((resolve,reject)=>{
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload=()=>resolve(reader.result)
        reader.onerror=(error)=>reject(error)
    })
}

//feltöltés:
export const uploadImage=async (file) => {
    try {
        const compressed = await imageCompression(file, {maxSizeMB: 1, maxWidthOrHeight: 800, useWebWorker: true })
        const base64img= await convertToBase64(file)
        const response = await axios.post(API_URL+"uploadImage",{image:base64img})
        return response.data

    } catch (error) {
        console.log("Upload failed: ", error);
        return null
    }
}
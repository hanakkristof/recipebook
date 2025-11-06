import axios from "axios";
import { RecipesForm } from "./pages/RecipesForm";
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "./firebaseApp"
import imageCompression from "browser-image-compression";

const apikey = import.meta.env.VITE_IMGBB_API_KEY
const imgbburl = "https://api.imgbb.com/1/upload?key=" + apikey

const uploadToIMGBB = async (file) => {
    const myFormData = new FormData()
    myFormData.append("image", file)
    try {
        const response = await axios.post(imgbburl, myFormData)
        const { url, delete_url } = response.data.data

        return { url, delete_url }
    } catch (error) {
        console.log("Képfeltöltési hiba " + error);

    }
}

export const addRecipe = async (recipe, file) => {
    try {
        let imgUrl = ""
        let deleteUrl = ""
        //KICSINÍT
        const compressed = await imageCompression(file, { maxWidthOrHeight: 800, useWebWorker: true })
        const result = await uploadToIMGBB(compressed)
        if (result) {
            imgUrl = result.url
            deleteUrl = result.delete_url
            const { url, delete_url } = await uploadToIMGBB(file)
            const collectionref = collection(db, "recipes")
            await addDoc(collectionref, { ...recipe, url, delete_url, timestamp: serverTimestamp() })
        }

    } catch (error) {
        console.log("Nem sikerült hozzáadni! " + error);

    }
}

//receptek realtime olvasása: onSnapshot()
export const readRecipes = async (setRecipes) => {
    const collectionRef = collection(db, "recipes")
    const q = query(collectionRef, orderBy("timestamp", "desc"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
        setRecipes(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    })
    return unsubscribe
}

//recept törlése ID alapján
export const deleteRecipe = async (id, delete_url) => {
    //await axios.get(delete_url)
    const docRef = doc(db, "recipes", id)
    await deleteDoc(docRef)
}

export const readRecipe = async (id, setRecipe) => {
    const docRef = doc(db, "recipes", id)
    const docData = await getDoc(docRef)
    setRecipe(docData.data())
}

export const updateRecipe = async (id, updatedData, file) => {
    console.log(updatedData, id);

    let url = updatedData.url || ""
    let delete_url = updatedData.delete_url || ""


    try {
        if (file) {
            const compressed = await imageCompression(file, { maxWidthOrHeight: 800, useWebWorker: true })
            const result = await uploadToIMGBB(compressed)
            if (result) {
                url = result.url
                delete_url = result.delete_url
            }
        }

        const docRef = doc(db, "recipes", id)
        await updateDoc(docRef, { ...updatedData, url, delete_url, updatedAt: serverTimestamp() })

    } catch (error) {
        console.log(error);

    }
}
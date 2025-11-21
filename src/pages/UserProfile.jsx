import React from 'react'
import { useContext } from 'react'
import { MyUserContext } from '../context/MyUserProvider'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'

export const UserProfile = () => {
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [loading, setLoading] = useState(false)

    const { user, avatarUpdate, deleteAccount } = useContext(MyUserContext)

    console.log(user);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        setFile(selected)
        if (selected) {
            setPreview(URL.createObjectURL(selected))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (!file) return
        try {
            await avatarUpdate(file)
        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (window.confirm("Biztosan kiszeretnéd törölni a fiókodat?")) {
            const pw = prompt("Add meg a jelszavadat a fiók törléséhez!")
            await deleteAccount(pw)
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <form onSubmit={handleSubmit} style={{ border: "var(--background), solid, 3px", color: 'var(--background)', display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "15px", backgroundColor: "var(--secondary)", padding: "15px", borderRadius: "10px" }}>
                <h2>Profil módosítása</h2>
                <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"10px"}}>
                    <h4>Felhasználónév: {user?.displayName}</h4>
                    <h4>Email: {user?.email}</h4>
                    {user?.photoURL && <img style={{ width: "70px", height: "70px", borderRadius: "50%", objectFit: "cover" }} src={user.photoURL} alt="" />}
                </div>
                <label>Új profilkép</label>
                <label htmlFor="file-upload" className='custom-file-upload'>Upload</label>
                <input className='inputtext fileinput' type="file" id='file-upload' accept='image/*' onChange={handleFileChange} />
                <button type='submit' disabled={loading}>{loading ? "Mentés folyamatban" : "Profilkép frissítése"}</button>
            </form >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "10px", flexDirection: "column" }}>
                {preview && <img src={preview} alt='Előnézet' style={{ width: "70px", height: "70px", borderRadius: "50%", objectFit: "cover" }} />}


            </div>

            <button onClick={handleDelete} style={{ color: "var(--disabled)", maxWidth: "100px", backgroundColor: "var(--primary)", border: "3px solid var(--disabled)" }}>
                Fiók törlése
            </button>

        </div>
    )
}



import React from 'react'
import { useContext } from 'react'
import { MyUserContext } from '../context/MyUserProvider'
import { MyToastify } from '../components/MyToastify'

export const PwReset = () => {
    

    const { msg,resetPass } = useContext(MyUserContext)
    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        console.log(data.get("email"));
        await resetPass(data.get("email"))


    }
    return (
        <div style={{ minHeight: "100vh", backgroundColor: "var(--primary)", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <form onSubmit={handleSubmit} style={{ border: "var(--background), solid, 3px", color: 'var(--background)', display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "15px", backgroundColor: "var(--secondary)", padding: "15px", borderRadius: "10px" }}>
                <h3>Jelszó megváltoztatása</h3>
                <span style={{ display: "flex", justifyContent: "space-between", gap: "5px" }}>
                    <label htmlFor="email">Email:</label>
                    <input name='email' type="email" id='email' /></span>
                <button>Új jelszó igénylése</button>
            </form>
            {msg && <MyToastify {...msg} />}
        </div>
    )
}

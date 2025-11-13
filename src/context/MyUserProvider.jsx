import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { auth } from '../firebaseApp'
import { useNavigate } from 'react-router'

export const MyUserContext = createContext() //tartály az adatoknak

export const MyUserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [msg, setMsg] = useState({})
  const [verified, setVerified] = useState(false)
  const navigate=useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe() //leiratkozunk a kibejelentkezés figyeléséről  
  }, [])

  const signUpUser = async (email, password, displayName) => {
    console.log(email, password, displayName);
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(auth.currentUser, { displayName })
      await sendEmailVerification(auth.currentUser)
      console.log("az email címre aktiváló link érkezett");
      setMsg({ signUp: "Kattints az email címben küldött aktiváló linkre" })

      logOutUser()

    } catch (error) {
      console.log(error);
      setMsg({ err: error.message })
    }

  }

  const logOutUser = async () => {
    await signOut(auth)

  }

  const signInUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      const currentUser = auth.currentUser
      if (!currentUser.emailVerified) {
        setMsg({ err: "Kattints az email címben küldött aktiváló linkre" })

        logOutUser()
        return
      }
      console.log("sikeres bejelentkezés");

      setMsg({ signIn: true })
    } catch (error) {
      console.log(error);
      setMsg({ err: error.message })
    }
  }

  const resetPass= async (email, )=>{
      let success=false
      try {
        await sendPasswordResetEmail(auth, email)
        setMsg({resetPw:"A jelszó visszaállítási email elküldve"})

      } catch (error) {
        setMsg({err:error.message})
      }finally{
        if (success) {
          navigate("/signin")
        }
      }
  }

  return (
    <div>
      <MyUserContext.Provider value={{ user, signUpUser, logOutUser, signInUser, msg, verified, setVerified, setMsg, resetPass }}>
        {children}
      </MyUserContext.Provider>
    </div>
  )
}



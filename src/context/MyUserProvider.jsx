import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { auth } from '../firebaseApp'

export const MyUserContext = createContext() //tartály az adatoknak

export const MyUserProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [msg, setMsg] = useState({})
  const [verified, setVerified] = useState(false)

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
      setUser(currentUser)
    })
  return ()=>unsubscribe() //leiratkozunk a kibejelentkezés figyeléséről  
  },[])

    const signUpUser = async (email, password, displayName)=>{
    console.log(email,password,displayName);
    try {
      await createUserWithEmailAndPassword(auth, email,password)
      await updateProfile(auth.currentUser,{displayName})
      await sendEmailVerification(auth.currentUser)
      console.log("az email címre aktiváló link érkezett");
      setMsg({signUp:"Kattints az email címben küldött aktiváló linkre"})
      setMsg(prev=>delete prev.err)
      logOutUser()
      
    } catch (error) {
      console.log(error);
      setMsg({err:error.message})
    }
    
  }

  const logOutUser = async ()=>{
    await signOut(auth)
    setMsg(prev =>delete prev.signIn)
  }

  const signInUser = async (email, password)=>{
    try {
      await signInWithEmailAndPassword(auth,email,password)
      const currentUser = auth.currentUser
      if (!currentUser.emailVerified) {
        setMsg({err:"Kattints az email címben küldött aktiváló linkre"})
        setMsg(prev=>delete prev.signIn)
        logOutUser()
        return
      }
      console.log("sikeres bejelentkezés");
      setMsg(prev=>delete prev.err)
      setMsg({signIn:true})
    } catch (error) {
      console.log(error);
      setMsg({err:error.message})
    }
  }

  return (
    <div>
        <MyUserContext.Provider value={{user, signUpUser, logOutUser, signInUser, msg, verified, setVerified}}>
          {children}
        </MyUserContext.Provider>
    </div>
  )
}



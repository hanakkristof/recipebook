import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import { MyUserContext } from '../context/MyUserProvider'
import { useNavigate } from 'react-router'
import signUp from './SignUp'


export const MyToastify = ({err, signUp,resetPw }) => {
    const {setMsg,msg} = useContext(MyUserContext)
    const navigate = useNavigate()
    console.log(msg);
    
    useEffect(()=>{
        if(err){
            toast.error(err,{position:"top-left"})
            setMsg({})
        }
        else if(signUp){
            console.log("LEFUTOT!!!!!!");
            
            toast.success(signUp,{position:"top-center"})
            setTimeout(()=>{
                navigate("/signin") 
                setMsg({})
            },2000)
        }
        else if(resetPw){
            toast.success(resetPw,{position:"top-center"})
            setMsg({})
            navigate("/signin")
        }
    },[err,signUp,resetPw])

  return (
    
      <ToastContainer />
    
  )
}


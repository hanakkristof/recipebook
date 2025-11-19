import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import { MyUserContext } from '../context/MyUserProvider'
import { useNavigate } from 'react-router'
import signUp from './SignUp'


export const MyToastify = () => {
    const {setMsg,msg} = useContext(MyUserContext)
    const navigate = useNavigate()
    console.log(msg);
    
    useEffect(()=>{
        if(msg?.err){
            toast.error(msg.err,{position:"top-left"})
            setMsg(null)
        }
        else if(msg?.signUp){
            console.log("LEFUTOT!!!!!!");
            
            toast.success(msg.signUp,{position:"top-center"})
            setTimeout(()=>{
                navigate("/signin") 
                setMsg(null)
            },2000)
        }
        else if(msg?.resetPw){
            toast.success(msg.resetPw,{position:"top-center"})
            setMsg(null)
            navigate("/signin")
        }
    },[msg])

  return null;
}


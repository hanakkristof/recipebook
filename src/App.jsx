import './App.css'
import { Route, Routes, useNavigate } from 'react-router'
import { Recipes } from './pages/Recipes'
import { RecipesForm } from './pages/RecipesForm'
import { Home } from './pages/Home'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import MyHeader from './components/MyHeader'
import { PwReset } from './pages/PwReset'
import { MyToastify } from './components/MyToastify'
import { ToastContainer } from 'react-toastify'
import { UserProfile } from './pages/UserProfile'
import { useContext } from 'react'
import { MyUserContext } from './context/MyUserProvider'

function App() {
  const {user} = useContext(MyUserContext)



  return (
    <div className='container'>
    <MyHeader/>
    <MyToastify/>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/recipes' element={<Recipes/>}/>
      <Route path='/addnew' element={user? <RecipesForm/> : <Home/>}/>
      <Route path='/edit/:id' element={user? <RecipesForm/> : <Home/>} />
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/pwreset' element={<PwReset/>}/>
      <Route path='/user' element={user? <UserProfile/> : <Home/>}/>
      
    </Routes>
    </div>
  )
}

export default App

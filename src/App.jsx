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

function App() {


  return (
    <div className='container'>
    <MyHeader/>
    <MyToastify/>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/recipes' element={<Recipes/>}/>
      <Route path='/addnew' element={<RecipesForm/>}/>
      <Route path='/edit/:id' element={<RecipesForm/>} />
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/pwreset' element={<PwReset/>}/>
      <Route path='/user' element={<UserProfile/>}/>
    </Routes>
    </div>
  )
}

export default App

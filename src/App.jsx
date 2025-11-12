import './App.css'
import { Route, Routes, useNavigate } from 'react-router'
import { Recipes } from './pages/Recipes'
import { RecipesForm } from './pages/RecipesForm'
import { Home } from './pages/Home'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import MyHeader from './components/MyHeader'

function App() {


  return (
    <div className='container'>
    <MyHeader/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/recipes' element={<Recipes/>}/>
      <Route path='/addnew' element={<RecipesForm/>}/>
      <Route path='/edit/:id' element={<RecipesForm/>} />
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/signin' element={<SignIn/>}/>
    </Routes>
    </div>
  )
}

export default App

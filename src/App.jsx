import './App.css'
import { Route, Routes } from 'react-router'
import { Recipes } from './pages/Recipes'
import { RecipesForm } from './pages/RecipesForm'
import { Home } from './pages/Home'

function App() {


  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/recipes' element={<Recipes/>}/>
      <Route path='/addnew' element={<RecipesForm/>}/>
    </Routes>
  )
}

export default App

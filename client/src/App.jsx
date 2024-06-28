import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './views/Home/Home'
import Detail from './views/Detail/Detail'
import NavBar from './components/NavBar/NavBar'
import Footter from './components/Footter/Footter'

function App() {

  return (
    <>    
      <NavBar/>

    
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/fundacion' element={<Detail/>}/>
        <Route path='/adopciones' element={<Detail/>}/>
        <Route path='/hogardetransito' element={<Detail/>}/>
        <Route path='/voluntariado' element={<Detail/>}/>
        <Route path='/donaciones' element={<Detail/>}/>
        <Route path='/suscripcion' element={<Detail/>}/>
        <Route path='/iniciarsesion' element={<Detail/>}/>
      </Routes>
    
      <Footter/>
    </>      
  )
}

export default App
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Footter from './components/Footter/Footter';
import Home from './views/Home/Home';
import Rescues from './views/Rescues/Rescues';
import DetailRescues from './views/Detail/DetailRescues';
import Foundation from './views/Foundation/Foundation';
import Adoptions from './views/Adoptions/Adoptions';
import DetailAdoptions from './views/Detail/DetailAdoptions';
import Donations from './views/Donations/Donations';

function App() {

  return (
    <>    
      <NavBar/>

    
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/rescates' element={<Rescues/>}/>
        <Route path='/rescatesdetalle/:id' element={<DetailRescues/>}/>
        <Route path='/fundacion' element={<Foundation/>}/>
        <Route path='/adopciones' element={<Adoptions/>}/>
        <Route path='/adopcionesdetalle/:id' element={<DetailAdoptions/>}/>
        <Route path='/donaciones' element={<Donations/>}/>
        {/* <Route path='/hogardetransito' element={<Detail/>}/> */}
        {/* <Route path='/voluntariado' element={<Detail/>}/> */}
        {/* <Route path='/iniciarsesion' element={<Detail/>}/> */}
      </Routes>
    
      <Footter/>
    </>      
  )
}

export default App
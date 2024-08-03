// src/App.js
import { Route, Routes, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCurrentUser } from './redux/auth/authActions';
import NavBar from './components/NavBar/NavBar';
import Footter from './components/Footter/Footter';
import Home from './views/Home/Home';
import Rescues from './views/Rescues/Rescues';
import DetailRescues from './views/Detail/DetailRescues';
import Foundation from './views/Foundation/Foundation';
import Adoptions from './views/Adoptions/Adoptions';
import DetailAdoptions from './views/Detail/DetailAdoptions';
import Donations from './views/Donations/Donations';
import BecomeAPartner from './views/BecomeAPartner/BecomeAPartner';
import LogIn from './views/LogIn/LogIn';
import SignUp from './views/SignUp/SignUp';
import UserProfile from './views/UserProfile/UserProfile';
import Dashboard from './views/Dashboard/Dashboard';
import SideBar from './components/Dashboard/SideBar';
import AdoptionsDashboard from './views/Dashboard/AdoptionsDashboard/AdoptionsDashboard';
import AdoptionsCreateForm from './views/Dashboard/AdoptionsDashboard/AdoptionsCreateForm';
import AdoptionsUpdateForm from './views/Dashboard/AdoptionsDashboard/AdoptionsUpdateForm';
import RescuesDashboard from './views/Dashboard/RescuesDashboard/RescuesDashboard';
import RescuesCreateForm from './views/Dashboard/RescuesDashboard/RescuesCreateForm';
import RescuesUpdateForm from './views/Dashboard/RescuesDashboard/RescuesUpdateForm';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isDashboardRoute = location.pathname.startsWith('/admin');
  const isAdmin = useSelector((state) => state.auth.user?.role);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      {!isDashboardRoute && <NavBar />}
      {isDashboardRoute && <SideBar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/rescates' element={<Rescues />} />
        <Route path='/rescatesdetalle/:id' element={<DetailRescues />} />
        <Route path='/fundacion' element={<Foundation />} />
        <Route path='/adopciones' element={<Adoptions />} />
        <Route path='/adopcionesdetalle/:id' element={<DetailAdoptions />} />
        <Route path='/donaciones' element={<Donations />} />
        <Route path='/hacertesocio' element={<BecomeAPartner />} />
        <Route path='/iniciarsesion' element={<LogIn />} />
        <Route path='/registro' element={<SignUp />} />
        <Route path='/usuario/:id' element={<UserProfile />} />
        {isAdmin && (
          <>
            <Route path='/admin' element={<Dashboard />} />
            <Route path='/admin/adopciones' element={<AdoptionsDashboard />} />
            <Route path='/admin/adopciones/create' element={<AdoptionsCreateForm />} />
            <Route path='/admin/adopciones/update/:id' element={<AdoptionsUpdateForm />} />
            <Route path='/admin/rescates' element={<RescuesDashboard />} />
            <Route path='/admin/rescates/create' element={<RescuesCreateForm />} />
            <Route path='/admin/rescates/update/:id' element={<RescuesUpdateForm />} />
          </>
        )}
      </Routes>

      {!isDashboardRoute && <Footter />}
    </>
  );
}

export default App;
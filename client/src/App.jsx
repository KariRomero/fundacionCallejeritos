import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCurrentUser } from './redux/auth/authActions';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
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
import MyInformation from './views/UserProfile/MyInformation';
import MyDonations from './views/UserProfile/MyDonations';
import MyAdoptions from './views/UserProfile/MyAdoptions';
import MySuscription from './views/UserProfile/MySuscription';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/admin');
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isAdmin = useSelector((state) => state.auth.user?.role === 'admin');

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    console.log("isLoggedIn:", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <>
      {isDashboardRoute ? <SideBar /> : <NavBar />}

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

        {/* Rutas protegidas */}
        <Route path='/usuario/:id' element={isLoggedIn ? <UserProfile /> : <Navigate to='/iniciarsesion' />} />
        <Route path='/usuario/:id/informacionpersonal' element={isLoggedIn ? <MyInformation /> : <Navigate to='/iniciarsesion' />} />
        <Route path='/usuario/:id/misdonaciones' element={isLoggedIn ? <MyDonations /> : <Navigate to='/iniciarsesion' />} />
        <Route path='/usuario/:id/misuscripcion' element={isLoggedIn ? <MySuscription /> : <Navigate to='/iniciarsesion' />} />
        <Route path='/usuario/:id/misadopciones' element={isLoggedIn ? <MyAdoptions /> : <Navigate to='/iniciarsesion' />} />

        {/* Rutas para administrador */}
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
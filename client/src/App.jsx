import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCurrentUser } from './redux/auth/authActions';
import { Route, Routes, useLocation } from 'react-router-dom';
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
import SideNav from './components/User/SideNav';
import UsersDashboard from './views/Dashboard/UsersDashboard/UsersDashboard';
import UsersInfo from './views/Dashboard/UsersDashboard/UsersInfo';
import UsersAdoptions from './views/Dashboard/UsersDashboard/UsersAdoptions';
import ErrorUserProfile from './components/Error/ErrorUserProfile';
import ErrorAdmin from './components/Error/ErrorAdmin';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/admin');
  const isUserProfileRoute = location.pathname.startsWith('/usuario');
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isAdmin = useSelector((state) => state.auth.user?.role);
  // const { user } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if(user)dispatch(fetchCurrentUser());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      {!isDashboardRoute && <NavBar />}

      {isDashboardRoute && isAdmin && <SideBar />}

      {isUserProfileRoute ? (
        <div className="flex">
          {isLoggedIn ? (
            <>
              <SideNav />
              <div className="flex-grow">
                <Routes>
                  <Route path='/usuario/:id/informacionpersonal' element={<MyInformation />} />
                  <Route path='/usuario/:id/misdonaciones' element={<MyDonations />} />
                  <Route path='/usuario/:id/misadopciones' element={<MyAdoptions />} />
                </Routes>
              </div>
            </>
          ) : (
            <ErrorUserProfile />
          )}
        </div>
      ) : (
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

          {isAdmin ? (
            <>
              <Route path='/admin' element={<Dashboard />} />
              <Route path='/admin/adopciones' element={<AdoptionsDashboard />} />
              <Route path='/admin/adopciones/create' element={<AdoptionsCreateForm />} />
              <Route path='/admin/adopciones/update/:id' element={<AdoptionsUpdateForm />} />
              <Route path='/admin/rescates' element={<RescuesDashboard />} />
              <Route path='/admin/rescates/create' element={<RescuesCreateForm />} />
              <Route path='/admin/rescates/update/:id' element={<RescuesUpdateForm />} />
              <Route path='/admin/usuarios' element={<UsersDashboard />} />
              <Route path='/admin/usuarios/user/:id' element={<UsersInfo />} />
              <Route path='/admin/usuarios/user/adoptions/:id' element={<UsersAdoptions />} />
            </>
          ) : (
            <>
            <Route path='*' element={<ErrorAdmin />}/>
            </>
          )}
        </Routes>
      )}

      {!isDashboardRoute && <Footter />}
    </>
  );
}

export default App;
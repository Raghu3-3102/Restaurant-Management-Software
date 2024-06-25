
import './App.css'
import Register from './pages/Register'
import './index.css'
import Login from './pages/Login'
import Home from './pages/Home'
import PublicRoutes from './component/PublicRoutes'
import {Routes,BrowserRouter,Route,Navigate} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Foreget_passward from './pages/Foreget_passward'
import { useSelector, useDispatch } from "react-redux";
import ProtectedRoutes from './component/ProtectedRoutes'
import Best from './pages/IsUser/Best'
import Profile from './pages/IsUser/Profile'
import Play_game from './pages/IsUser/Play_game'
import Add_items from './pages/isManager/Add_items'
import Oder from './pages/isManager/Oder'
import Today_revenu from './pages/isManager/Today_revenu'
import Visulization from './pages/isManager/Visulization'
import Notification from './component/Notification'
import Book_food from './pages/IsUser/Book_food'
import Delete_items from './pages/isManager/Delete_items'
import Blocked_unBlocked from './pages/isManager/Blocked_unBlocked'
import Admin from './pages/Admin'
import Career from './pages/IsUser/Career'
import Massege from './pages/isManager/Massege'
import Salles from './pages/isManager/Salles'
import Feedback from './pages/IsUser/Feedback'
import PaymentGateway from './component/PaymentGateway'
import Reservation from './pages/IsUser/Reservation'



function App() {

 const token = localStorage.getItem('token');

 const { loading } = useSelector((state) => {
  return state.alerts;
 
});

  

  return (
    <>



    <BrowserRouter>
    {loading && (
          <div className="spinner-parent">
            <div class="spinner-border " role="status"></div>
          </div>
        )}

      <Toaster position="top-center" reverseOrder={false}/>

    <Routes>
      <Route path='/'
       element={<PublicRoutes><Register /></PublicRoutes>}/>
  
    <Route path='/Login'
       element={<PublicRoutes><Login /></PublicRoutes> }/>

    <Route path='/Forget-passward'
       element={ <PublicRoutes><Foreget_passward /></PublicRoutes>}/>

<Route path='/Home'
       element={<ProtectedRoutes><Home /></ProtectedRoutes>}/>

<Route path='/best'
       element={<ProtectedRoutes><Best /></ProtectedRoutes>}/>

<Route path='/profile'
       element={<ProtectedRoutes><Profile /></ProtectedRoutes>}/>

<Route path='/notify'
       element={<ProtectedRoutes><Notification /></ProtectedRoutes>}/>

<Route path='/Career'
       element={<ProtectedRoutes><Career /></ProtectedRoutes>}/>

       
<Route path='/Reservation'
       element={<ProtectedRoutes><Reservation /></ProtectedRoutes>}/>

<Route path='/Feedback'
       element={<ProtectedRoutes><Feedback /></ProtectedRoutes>}/>

<Route path='/PaymentGateway'
       element={<ProtectedRoutes><PaymentGateway /></ProtectedRoutes>}/>

       {/* manager routes */}

<Route path='/oder'
       element={<ProtectedRoutes><Oder /></ProtectedRoutes>}/>

<Route path='/today-revenue'
       element={<ProtectedRoutes><Today_revenu /></ProtectedRoutes>}/>

<Route path='/visulization'
       element={<ProtectedRoutes><Visulization /></ProtectedRoutes>}/>

<Route path='/messege'
       element={<ProtectedRoutes><Massege /></ProtectedRoutes>}/>

<Route path='/salles'
       element={<ProtectedRoutes><Salles /></ProtectedRoutes>}/>

<Route path='/add-item'
       element={<ProtectedRoutes><Add_items /></ProtectedRoutes>}/>

<Route path='/Book_food/:foodid'
       element={<ProtectedRoutes><Book_food /></ProtectedRoutes>}/>

<Route path='/Delete_items'
       element={<ProtectedRoutes><Delete_items /></ProtectedRoutes>}/>

<Route path='/Blocked_status'
       element={<ProtectedRoutes><Blocked_unBlocked /></ProtectedRoutes>}/>

<Route path='/Admin'
       element={<ProtectedRoutes><Admin /></ProtectedRoutes>}/>
       






    </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App

import { Route, Routes } from 'react-router-dom'
import User from './Pages/Register/User/User'
import NewRegUser from './Pages/Register/User/NewRegUser'
import Home from './Pages/Home/Home'
import AdvancedService from './Pages/ControlWork/AdvancedService/AdvancedService'
import Login from './Login/Login/Login'
import EditUser from './Pages/Register/User/EditUser'
import Error from './Pages/Error/Error'
import Inauthorization from './Pages/Inauthorization/Inauthorization'
import RecPassword from './Login/RecPassword/RecPassword'
import Medicion from './Pages/ControlWork/Medicion/Medicion'
import ContractReform from './Pages/ControlWork/ContractReform/ContractReform'
import Programação from './Pages/ControlWork/Programação/Programação'
import Acomp from './Pages/ControlWork/TesteAcomp/Acomp'

export default function RoutesApp() {
    const BackdropAction = ({ children }) => {
      return children;
    };
  
    return (
      <BackdropAction>
        <Routes>
          <Route path='/User' element={<User />} />
          <Route path='/newregUser' element={<NewRegUser />} />
          <Route path='/EditUser/:id' element={<EditUser />} />

          <Route path='/Login' element={<Login />} />
          <Route path='/recPassword' element={<RecPassword />} />

          <Route path='/Home' element={<Home />} />
          <Route path='/' element={<Login />} />

          <Route path='/AdvancedService' element={<AdvancedService />} />

          <Route path='/ContractReform' element={<ContractReform />} />          

          <Route path='/Medicion' element={<Medicion />} />

          <Route path='/Programação' element={<Programação />} />

          <Route path='/Acomp' element={<Acomp />} />

          <Route path='/inauthorization' element={<Inauthorization />} />

          <Route exact path='*' element={<Error />} />

        </Routes>
      </BackdropAction>
    );
  }

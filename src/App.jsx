import { Routes, Route, useLocation } from 'react-router-dom';

import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx"
import Home from "./pages/Home.jsx";
import CreateProduct from './pages/CreateProduct.jsx';
import Navbar from './components/Navbar.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';

function App(){
  const location = useLocation();

  // Define as rotas onde a Navbar NÃO deve ser exibida
  const pathsWithoutNavbar = ["/login", "/register", "/forgot-password", "/reset-password"];

  return(
    <div >
      {!pathsWithoutNavbar.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/create-product' element={<CreateProduct/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route path='/reset-password' element={<ResetPassword />} />
      </Routes>   
  
    </div>
  )
}

export default App;
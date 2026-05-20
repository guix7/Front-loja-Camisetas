import { Routes, Route, useLocation } from 'react-router-dom';
import {useState, useEffect} from 'react';

import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx"
import Home from "./pages/Home.jsx";
import CreateProduct from './pages/CreateProduct.jsx';
import Navbar from './components/Navbar.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import CartPage from './pages/CartPage.jsx';

function App(){
  const location = useLocation();

  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

 
  function addToCart(product) {
    setCart((prev) => {
      const existingProduct = prev.find((item) => item.id === product.id);

      if (existingProduct) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item,
        );
      }

      return [...prev, { ...product, quantidade: 1 }];
    });
  }

  
  function removeFromCart(id) {
    setCart((prev) => {
      const existingProduct = prev.find((item) => item.id === id);

      if (!existingProduct) return prev;

      if (existingProduct.quantidade === 1) {
        return prev.filter((item) => item.id !== id);
      }

      return prev.map((item) =>
        item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item,
      );
    });
  }

  
  const pathsWithoutNavbar = ["/login", "/register", "/forgot-password", "/reset-password"];

  return(
    <div>
      
      {!pathsWithoutNavbar.includes(location.pathname) && <Navbar cartProducts={cart} />}
      
      <Routes>
        
        <Route path='/' element={<Home addToCart={addToCart} />} />
        
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/create-product' element={<CreateProduct/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route path='/reset-password' element={<ResetPassword />} />

        
        <Route path='/cart' element={<CartPage cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />} />
      </Routes>   
    </div>
  )
}

export default App;
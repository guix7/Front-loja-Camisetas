import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar(){
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    
    // Verifica se o usuário está logado
    const isLoggedIn = !!localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsOpen(false);
        navigate("/login");
    };

    return(
        <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center relative z-50">
            
            {/* LOGO */}
            <Link to="/" className="text-xl font-bold hover:text-gray-300 transition">
                Loja Virtual
            </Link>

            {/* LINKS */}
            <div className="flex gap-6 items-center">
                <Link 
                    to='/' 
                    className="hover:text-gray-300 transition"
                >
                    Home
                </Link>

                
                {/* MENU DE USUÁRIO */}
                <div className="relative">
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-2 focus:outline-none hover:text-gray-300 transition"
                    >
                        <span className="hidden md:inline text-sm font-medium">
                            {isLoggedIn ? "Minha Conta" : "Acesse sua conta"}
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>

                    {/* DROPDOWN */}
                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 text-gray-800 border border-gray-100">
                            {!isLoggedIn ? (
                                <>
                                    <Link 
                                        to="/login" 
                                        className="block px-4 py-2 hover:bg-gray-100 transition"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link 
                                        to="/register" 
                                        className="block px-4 py-2 hover:bg-gray-100 transition"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Cadastre-se
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link 
                                        to='/create-product' 
                                        className="block px-4 py-2 hover:bg-gray-100 transition"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Cadastrar Produto
                                    </Link>
                                    <button 
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 font-medium transition border-t border-gray-100"
                                    >
                                        Sair
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
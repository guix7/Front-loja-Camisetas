import { useState } from "react";
import { loginUser } from "../services/api.js";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [isSwapping, setIsSwapping] = useState(false);
  const navigate = useNavigate();

  async function handleLogin() {
    setErro("");
    setLoading(true);

    try {
      if (!email || !senha) {
        throw new Error("Os dados devem ser preenchidos");
      }

      if (senha.length < 6) {
        throw new Error("Senha deve ter ao menos 6 caracteres");
      }

      const data = {
        email,
        senha,
      };

      const response = await loginUser(data);

      console.log("Login feito:", response);

      //Salvar token
      localStorage.setItem("token", response.token);

      setEmail("");
      setSenha("");

      navigate("/");
    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleGoToRegister = (e) => {
    e.preventDefault();
    setIsSwapping(true);
    // Espera a animação de 700ms terminar antes de navegar
    setTimeout(() => {
      navigate("/register");
    }, 700);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Div de Boas-vindas (Lado Esquerdo) */}
        <div className={`hidden md:flex flex-col justify-center items-center w-1/2 bg-blue-600 text-white p-12 text-center transition-all duration-700 ease-in-out transform ${isSwapping ? "md:translate-x-full" : "translate-x-0"}`}>
          <h2 className="text-4xl font-bold mb-6 text-white">Bem-vindo de volta!</h2>
          <p className="text-lg opacity-90 leading-relaxed text-white">
            Bem vindo para ter acesso aos dados de sua conta e aos seus produtos por favor preencha suas informações.
          </p>
          <div className="mt-8 w-16 h-1 bg-white/30 rounded-full"></div>
        </div>

        {/* Div de Login (Lado Direito) */}
        <div className={`w-full md:w-1/2 p-8 md:p-12 transition-all duration-700 ease-in-out transform ${isSwapping ? "-translate-x-full opacity-0" : "translate-x-0"}`}>
          <h2 className="text-3xl font-bold mb-8 text-center md:text-left text-gray-800">Login</h2>
          <div className="flex flex-col gap-5">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </span>
            <input
              type="email"
              placeholder="Digite o Email"
              className="border border-gray-300 p-3 pl-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErro("");
              }}
            />
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </span>
            <input
              type="password"
              placeholder="Digite a Senha"
              className="border border-gray-300 p-3 pl-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={senha}
              onChange={(e) => {
                setSenha(e.target.value);
                setErro("");
              }}
            />
          </div>

          <button
            disabled={loading}
            onClick={handleLogin}
            className={`w-full p-3 rounded-lg font-bold text-white transition-all shadow-lg ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          {erro && (
            <p className="text-red-500 text-sm mt-2 text-center font-medium">
              {erro}
            </p>
          )}

          <div className="text-center -mt-2">
            <button
              onClick={() => navigate("/forgot-password")}
              className="text-blue-600 hover:underline text-sm font-medium bg-transparent border-none cursor-pointer"
            >
              Esqueci minha senha
            </button>
          </div>

          <p className="mt-4 text-center text-gray-600 text-sm">
            Não tem uma conta?{" "}
            <button
              onClick={handleGoToRegister}
              className="text-blue-600 hover:underline font-semibold bg-transparent border-none cursor-pointer"
            >
              Cadastre-se
            </button>
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
import { useState } from "react";
import { forgotPasswordRequest } from "../services/api.js"; // Assumindo que esta função será criada

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      if (!email) {
        throw new Error("Por favor, digite seu e-mail.");
      }

      // Chamada à API para solicitar a redefinição de senha
      // A função forgotPasswordRequest precisa ser implementada em services/api.js
      await forgotPasswordRequest({ email });

      setMessage("Se um e-mail válido for encontrado, um link de redefinição de senha será enviado para ele.");
      setEmail("");
    } catch (err) {
      setError(err.message || "Ocorreu um erro ao solicitar a redefinição de senha.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 md:p-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Esqueci Minha Senha</h2>
        <p className="text-center text-gray-600 mb-6">
          Digite seu e-mail abaixo para receber um link de redefinição de senha.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </span>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              className="border border-gray-300 p-3 pl-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-lg font-bold text-white transition-all shadow-lg ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Enviando..." : "Enviar Link de Redefinição"}
          </button>
        </form>

        {message && <p className="text-green-600 text-sm mt-4 text-center font-medium">{message}</p>}
        {error && <p className="text-red-500 text-sm mt-4 text-center font-medium">{error}</p>}
      </div>
    </div>
  );
}

export default ForgotPassword;
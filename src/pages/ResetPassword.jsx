import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPasswordConfirm } from "../services/api.js";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (senha !== confirmarSenha) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    try {
      if (!token) {
        throw new Error("Token de recuperação não encontrado");
      }

      await resetPasswordConfirm({ token, senha });

      setMessage(
        "Senha redefinida com sucesso! Redirecionando para o login...",
      );

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setError(error.message || "Erro ao redefinir a senha");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 md:p-12">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Nova Senha
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Digite e confirme sua nova senha Abaixo.
        </p>

        <form action="" onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input 
            type="text" 
            placeholder="Nova Senha"
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-green-500 transition-all"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            minLength={6}
            />

            <input 
            type="password"
            placeholder="confirme a nova Senha"
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-green-500 transition-all" 
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
            />

            <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-lg font-bold text-white transition-all shadow-lg ${
              loading ? "bg-green-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
            >
                {loading ? "salvando..." : "Redefinir Senha"}
            </button>
        </form>
        {message && <p className="text-green-600 text-sm mt-4 text-center font-medium">{message}</p>}
        {error && <p className="text-red-500 text-sm mt-4 text-center font-medium">{error}</p>}
      </div>
    </div>
  );
}

export default ResetPassword

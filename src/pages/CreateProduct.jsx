import { useEffect, useState } from "react";
import { postProduct } from "../services/api";

function CreateProduct() {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    estoque: "",
    categoria: "",
  });

  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    setImagem(file);
    const url = URL.createObjectURL(file);
    setPreview(url);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");
      setError("");
      setMessage("");

      if (!form.nome || !form.preco) {
        setMessage("Preencha os campos obrigatórios");
        setLoading(false);
        return;
      }

      const formData = new FormData();

      formData.append("nome", form.nome);
      formData.append("descricao", form.descricao);
      formData.append("preco", form.preco);
      formData.append("estoque", form.estoque);
      formData.append("categoria", form.categoria);
      formData.append("imagem", imagem);

      await postProduct(formData);

      setMessage("Produto criado com sucesso!");

      setForm({
        nome: "",
        descricao: "",
        preco: "",
        estoque: "",
        categoria: "",
      });
      setImagem(null);
      setPreview(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Criar Produto</h1>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Digite o nome do produto"
            className="border p-2 rounded"
            name="nome"
            value={form.nome}
            onChange={handleChange}
          />

          <textarea
            placeholder="Digite a descrição do produto"
            className="border p-2 rounded"
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
          />

          <input
            type="number"
            placeholder="Digite o preço"
            className="border p-2 rounded"
            name="preco"
            value={form.preco}
            onChange={handleChange}
          />

          <input
            type="number"
            placeholder="Digite o número de itens no estoque"
            className="border p-2 rounded"
            name="estoque"
            value={form.estoque}
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="Digite a categoria do produto"
            className="border p-2 rounded"
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
          />
          <input
            type="file"
            placeholder="Digite a categoria do produto"
            className="border p-2 rounded"
            accept="image/*"
            onChange={handleImageChange}
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white p-2 rounded mt-2"
          >
            {loading ? "Criando ..." : "Criar Produto"}
          </button>
        </form>

        {message && (
          <p className="mt-2 text-center text-green-600">{message}</p>
        )}

        {error && <p className="mt-2 text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
}

export default CreateProduct;

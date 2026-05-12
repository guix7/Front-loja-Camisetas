import { useState, useEffect } from "react";
import { getProducts } from "../services/api.js";
import ProductCart from "../components/ProductCard.jsx";
import Cart from "../components/Cart.jsx";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      setErro("");
      setLoading(true);

      try {
        const response = await getProducts();
        console.log(response);
        setProducts(response.data);
      } catch (error) {
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

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

      if (existingProduct.quantidade === 1) {
        return prev.filter((item) => item.id !== id);
      }

      return prev.map((item) =>
        item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item,
      );
    });
  }

  return (
    <div className="p-6 flex gap-6">
      {/* PRODUTOS */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">Produtos</h1>

        {loading && <p className="text-gray-500">Carregando...</p>}
        {erro && <p className="text-red-500">{erro}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCart
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      </div>

      {/* CARRINHO */}
      <div className="w-80 border rounded-lg p-4 shadow-md h-fit">
        <h2 className="text-xl font-bold mb-4">Carrinho</h2>

        {cart.length === 0 && <p>Seu carrinho está vazio</p>}

        {cart.map((product) => (
          <Cart
            key={product.id}
            cartProducts={product}
            removeFromCart={() => removeFromCart(product.id)}
            addToCart={addToCart}
          />
        ))}

        <h3 className="mt-4 font-bold text-red-500">
          Total:{" "}
          {cart
            .reduce((total, item) => total + item.preco * item.quantidade, 0)
            .toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
        </h3>
      </div>
    </div>
  );
}

export default App;

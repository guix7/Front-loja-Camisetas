import { useState, useEffect } from "react";
import { getProducts } from "../services/api.js";
import ProductCart from "../components/ProductCard.jsx";


function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    async function fetchProducts() {
      setErro("");
      setLoading(true);
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Produtos</h1>

      {loading && <p className="text-gray-500">Carregando...</p>}
      {erro && <p className="text-red-500">{erro}</p>}

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCart
            key={product.id}
            product={product}
            addToCart={addToCart} 
          />
        ))}
      </div>
    </div>
  );
}

export default Home; 
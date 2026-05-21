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
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between font-sans antialiased">
      
      {/* 1. HERO SECTION (BANNER PRINCIPAL DE MODA) */}
      <section className="bg-gradient-to-r from-gray-950 via-neutral-900 to-gray-950 text-white py-16 md:py-24 px-6 relative overflow-hidden shadow-inner">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
          <div className="space-y-6 text-center md:text-left">
            <span className="bg-red-600 text-white text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full">
              Nova Coleção Outono/Inverno
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Estilo que veste, <br />
              <span className="text-red-500">Estampas que falam</span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg max-w-md mx-auto md:mx-0">
              Camisetas exclusivas produzidas com algodão 100% premium. Conforto único, caimento perfeito e artes originais para expressar a sua identidade.
            </p>
            <div className="pt-2">
              <a 
                href="#produtos" 
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-red-500/20 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Ver Coleção Completa
              </a>
            </div>
          </div>
          
          {/* Ilustração/Destaque visual de moda no lado direito */}
          <div className="hidden md:flex justify-center items-center relative">
            <div className="absolute w-72 h-72 bg-red-500/10 rounded-full blur-3xl"></div>
            <div className="border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-sm transform rotate-2">
              <span className="text-yellow-400 font-bold text-xs uppercase tracking-wider">Leve 3, Pague 2</span>
              <p className="text-xl font-bold mt-1 text-white">Combo Estampas Urbanas</p>
              <p className="text-sm text-gray-400 mt-2">Monte o seu kit com nossas camisetas mais vendidas e ganhe desconto progressivo na finalização.</p>
            </div>
          </div>
        </div>
      </section>

      {/* RECURSOS DA LOJA (VANTAGENS DE VESTUÁRIO) */}
      <div className="bg-white border-b border-gray-200 py-6 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3 justify-center">
            <span className="text-2xl">🌱</span>
            <div>
              <p className="font-bold text-sm text-gray-800">100% Algodão Premium</p>
              <p className="text-xs text-gray-500">Malha cheirosa, macia e super durável</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 justify-center border-y sm:border-y-0 sm:border-x border-gray-100 py-4 sm:py-0">
            <span className="text-2xl">🔄</span>
            <div>
              <p className="font-bold text-sm text-gray-800">Primeira Troca Grátis</p>
              <p className="text-xs text-gray-500">Até 30 dias para testar o tamanho</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 justify-center">
            <span className="text-2xl">📦</span>
            <div>
              <p className="font-bold text-sm text-gray-800">Envio para todo o Brasil</p>
              <p className="text-xs text-gray-500">Embalagem exclusiva e rastreamento completo</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CONTEÚDO PRINCIPAL (CATÁLOGO DE ROUPAS) */}
      <main id="produtos" className="max-w-7xl mx-auto px-4 md:px-6 py-12 flex-grow w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-gray-200">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-950 tracking-tight">
              Mais Vendidas
            </h2>
            <p className="text-gray-500 text-sm mt-1">As estampas e modelos favoritos da nossa comunidade.</p>
          </div>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            <p className="text-gray-500 text-sm mt-4 font-medium animate-pulse">Carregando catálogo de moda...</p>
          </div>
        )}
        
        {erro && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-xl text-red-700 text-sm max-w-2xl mx-auto my-8 text-center font-medium">
            ⚠️ Ocorreu um erro ao buscar o catálogo: {erro}
          </div>
        )}

        {/* GRID DE ATÉ 4 CARDS POR LINHA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCart
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      {/* 3. RODAPÉ (FOOTER PREMIUM) */}
      <footer className="bg-neutral-950 text-neutral-400 text-sm border-t border-neutral-900 pt-12 pb-6 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <p className="text-white font-bold text-lg tracking-wider">Estampas Pro</p>
            <p className="text-xs leading-relaxed text-neutral-500">
              Sua marca autoral de vestuário urbano. Criando conexões através do design e estampas marcantes com qualidade incomparável.
            </p>
          </div>
          <div>
            <p className="text-white font-semibold mb-3 text-xs uppercase tracking-widest text-neutral-300">Coleções</p>
            <ul className="space-y-2 text-xs">
              <li><a href="/" className="hover:text-white transition">Camisetas Básicas</a></li>
              <li><a href="/" className="hover:text-white transition">Estampas Geek & Pop</a></li>
              <li><a href="/" className="hover:text-white transition">Coleção Minimalista</a></li>
            </ul>
          </div>
          <div>
            <p className="text-white font-semibold mb-3 text-xs uppercase tracking-widest text-neutral-300">Ajuda e Suporte</p>
            <ul className="space-y-2 text-xs">
              <li><a href="/" className="hover:text-white transition">Guia de Tamanhos</a></li>
              <li><a href="/" className="hover:text-white transition">Trocas e Devoluções</a></li>
              <li><span className="text-neutral-500">Contato:</span> contato@estampaspro.com</li>
            </ul>
          </div>
          <div>
            <p className="text-white font-semibold mb-3 text-xs uppercase tracking-widest text-neutral-300">Clube Exclusivo</p>
            <p className="text-xs text-neutral-500 mb-3">Inscreva-se e ganhe **10% OFF** na sua primeira compra de camisetas.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                className="bg-neutral-900 border border-neutral-800 text-white px-3 py-2 text-xs rounded-lg focus:outline-none focus:border-red-500 w-full"
              />
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 text-xs rounded-lg transition">
                Participar
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-neutral-900 pt-6 text-center text-xs text-neutral-600 flex flex-col sm:flex-row justify-between gap-4">
          <p>© 2026 Estampas Pro. Todos os direitos reservados.</p>
          <div className="flex justify-center gap-4 text-neutral-500">
            <span>Pix</span>
            <span>Cartão de Crédito</span>
            <span>Boleto</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Home;
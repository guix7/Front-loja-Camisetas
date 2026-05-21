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
      
      {/* 1. HERO SECTION (BANNER PRINCIPAL) */}
      <section className="bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 text-white py-16 md:py-24 px-6 relative overflow-hidden shadow-inner">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
          <div className="space-y-6 text-center md:text-left">
            <span className="bg-blue-600 text-white text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
              Novidades da Semana
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Tecnologia de Ponta <br />
              <span className="text-blue-500">Para o Seu Estilo de Vida</span>
            </h1>
            <p className="text-gray-300 text-base md:text-lg max-w-md mx-auto md:mx-0">
              Explore os melhores gadgets, eletrônicos e acessórios com frete grátis e parcelamento em até 12x sem juros.
            </p>
            <div className="pt-2">
              <a 
                href="#produtos" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Comprar Agora
              </a>
            </div>
          </div>
          
          {/* Ilustração sutil no lado direito para equilibrar o visual do banner */}
          <div className="hidden md:flex justify-center items-center relative">
            <div className="absolute w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="border border-slate-700 bg-slate-800/40 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-sm transform rotate-2">
              <span className="text-yellow-400 font-bold text-xs uppercase tracking-wider">Oferta Imperdível</span>
              <p className="text-xl font-bold mt-1">Gamer Setup Essentials</p>
              <p className="text-sm text-gray-400 mt-2">Combine os melhores periféricos com descontos de até 30% acumulativos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* RECURSOS DA LOJA (BADGES DE VANTAGENS) */}
      <div className="bg-white border-b border-gray-200 py-6 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3 justify-center">
            <span className="text-2xl">🚚</span>
            <div>
              <p className="font-bold text-sm text-gray-800">Frete Grátis</p>
              <p className="text-xs text-gray-500">Em compras acima de R$ 150</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 justify-center border-y sm:border-y-0 sm:border-x border-gray-100 py-4 sm:py-0">
            <span className="text-2xl">🛡️</span>
            <div>
              <p className="font-bold text-sm text-gray-800">Compra 100% Segura</p>
              <p className="text-xs text-gray-500">Garantia de reembolso de 30 dias</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 justify-center">
            <span className="text-2xl">💬</span>
            <div>
              <p className="font-bold text-sm text-gray-800">Suporte 24/7</p>
              <p className="text-xs text-gray-500">Prontos para te atender via chat</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CONTEÚDO PRINCIPAL (MAIN GRID) */}
      <main id="produtos" className="max-w-7xl mx-auto px-4 md:px-6 py-12 flex-grow w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-gray-200">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-950 tracking-tight">
              Produtos em Destaque
            </h2>
            <p className="text-gray-500 text-sm mt-1">Selecione os melhores itens adicionados recentemente à nossa vitrine.</p>
          </div>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-500 text-sm mt-4 font-medium animate-pulse">Carregando catálogo de produtos...</p>
          </div>
        )}
        
        {erro && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-xl text-red-700 text-sm max-w-2xl mx-auto my-8 text-center font-medium">
            ⚠️ Ocorreu um erro ao buscar os produtos: {erro}
          </div>
        )}

        {/* GRID EXCLUSIVO DE ATÉ 4 CARDS POR LINHA */}
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

      {/* 3. RODAPÉ (FOOTER) */}
      <footer className="bg-gray-950 text-gray-400 text-sm border-t border-gray-900 pt-12 pb-6 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <p className="text-white font-bold text-lg tracking-wider">Loja Virtual</p>
            <p className="text-xs leading-relaxed text-gray-500">
              A melhor experiência de compra online. Levando os produtos mais modernos diretamente para o conforto do seu lar.
            </p>
          </div>
          <div>
            <p className="text-white font-semibold mb-3 text-xs uppercase tracking-widest text-gray-300">Links Rápidos</p>
            <ul className="space-y-2 text-xs">
              <li><a href="/" className="hover:text-white transition">Início / Vitrine</a></li>
              <li><a href="/cart" className="hover:text-white transition">Meu Carrinho</a></li>
              <li><a href="/login" className="hover:text-white transition">Acessar Conta</a></li>
            </ul>
          </div>
          <div>
            <p className="text-white font-semibold mb-3 text-xs uppercase tracking-widest text-gray-300">Atendimento</p>
            <ul className="space-y-2 text-xs">
              <li><span className="text-gray-500">E-mail:</span> suporte@lojavirtual.com</li>
              <li><span className="text-gray-500">Horário:</span> Seg a Sex - 9h às 18h</li>
            </ul>
          </div>
          <div>
            <p className="text-white font-semibold mb-3 text-xs uppercase tracking-widest text-gray-300">Newsletter</p>
            <p className="text-xs text-gray-500 mb-3">Receba cupons e alertas de ofertas direto no seu e-mail.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="bg-gray-900 border border-gray-800 text-white px-3 py-2 text-xs rounded-lg focus:outline-none focus:border-blue-500 w-full"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 text-xs rounded-lg transition">
                Ok
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-gray-900 pt-6 text-center text-xs text-gray-600 flex flex-col sm:flex-row justify-between gap-4">
          <p>© 2026 Loja Virtual. Todos os direitos reservados.</p>
          <div className="flex justify-center gap-4 text-gray-500">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Pix</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Home;
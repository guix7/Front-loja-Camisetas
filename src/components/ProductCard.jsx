function ProductCart({ product, addToCart }) {
  return (
    <div className="relative w-full h-[450px] rounded-[2rem] overflow-hidden shadow-lg bg-white border border-gray-100 flex flex-col group hover:shadow-2xl transition-all duration-300">
      
      {/* CONTAINER DA IMAGEM: Centraliza o produto sem esticar e sem cortar */}
      <div className="w-full h-[220px] bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden select-none">
        <img
          src={product.imagem}
          alt={product.nome}
          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      
      <div className="absolute inset-x-0 bottom-0 h-[250px] bg-gradient-to-t from-gray-950 via-neutral-900 to-neutral-900/90 text-white p-5 flex flex-col justify-between">
        
        
        <div className="space-y-2">
          
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-lg font-bold tracking-tight leading-tight truncate max-w-[150px]">
              {product.nome}
            </h1>
            <span className="bg-white/10 backdrop-blur-md text-white font-bold text-xs px-2.5 py-1.5 rounded-full border border-white/10 whitespace-nowrap">
              {Number(product.preco).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                maximumFractionDigits: 0,
              })}
            </span>
          </div>

          
          <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed min-h-[32px]">
            {product.descricao}
          </p>
        </div>

        
        <div className="space-y-3">
          
          <div className="flex gap-1.5">
            <span className="bg-white/5 text-gray-300 text-[9px] uppercase font-semibold px-2 py-0.5 rounded tracking-wider">
              Qualidade
            </span>
            <span className="bg-white/5 text-gray-300 text-[9px] uppercase font-semibold px-2 py-0.5 rounded tracking-wider">
              Destaque
            </span>
          </div>

         
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-white hover:bg-gray-100 text-gray-950 font-bold py-2.5 rounded-xl transition-all active:scale-[0.98] text-xs tracking-wide shadow-md"
          >
            Adicionar ao Carrinho
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductCart;
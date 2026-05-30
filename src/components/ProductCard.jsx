function ProductCart({ product, addToCart }) {
  return (
    <div className="relative w-full h-[480px] rounded-[2rem] overflow-hidden shadow-xl group hover:shadow-2xl transition-all duration-300">
      
      
      <img
        src={product.imagem}
        alt={product.nome}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />

      
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

      
      <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end h-3/5 text-white space-y-4">
        
       
        <div className="flex items-start justify-between gap-2">
          <h1 className="text-xl font-bold tracking-tight leading-tight drop-shadow-sm">
            {product.nome}
          </h1>
          <span className="bg-white/15 backdrop-blur-md text-white font-bold text-sm px-3 py-1.5 rounded-full whitespace-nowrap border border-white/10">
            {Number(product.preco).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              maximumFractionDigits: 0, 
            })}
          </span>
        </div>

        
        <p className="text-gray-300 text-xs md:text-sm line-clamp-2 leading-relaxed font-light">
          {product.descricao}
        </p>

        
        <div className="flex gap-2 pt-1">
          <span className="bg-white/10 text-gray-200 text-[10px] uppercase font-semibold px-2.5 py-1 rounded-md tracking-wider">
            100% Algodão
          </span>
          <span className="bg-white/10 text-gray-200 text-[10px] uppercase font-semibold px-2.5 py-1 rounded-md tracking-wider">
            Premium
          </span>
        </div>

        
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-white hover:bg-gray-100 text-gray-950 font-bold py-3.5 rounded-xl transition-all shadow-md active:scale-[0.98] mt-2 text-sm tracking-wide"
        >
          Adicionar ao Carrinho
        </button>
        
      </div>
    </div>
  );
}

export default ProductCart;
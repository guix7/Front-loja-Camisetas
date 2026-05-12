function ProductCart({ product, addToCart }) {
  return (
    <div className="border rounded-lg p-4 shadow-md flex flex-col min-h-[400px]">
      <img
        src={product.imagem}
        alt={product.nome}
        className="w-full h-[350px] rounded mb-2"
      />

      <h1 className="text-lg font-bold">{product.nome}</h1>

      <h2 className="text-orange-600 font-semibold text-lg">
        {Number(product.preco).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </h2>

      <p className="text-gray-600 flex-grow">
        {product.descricao}
      </p>

      <button
        onClick={() => addToCart(product)}
        className="mt-auto w-1/2 self-start mt-[10px] p-[5px] bg-blue-500 text-white px-3 rounded"
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
}

export default ProductCart;
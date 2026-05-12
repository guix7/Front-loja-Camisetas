function Cart({cartProducts,addToCart, removeFromCart}){
     return (
        <div className="border-b pb-4 mb-4">
            <h2 className="font-bold">{cartProducts.nome}</h2>

            <p className="text-green-600">
                {cartProducts.preco.toLocaleString('pt-BR',{
                    style: 'currency',
                    currency: 'BRL'
                })}
            </p>

            <p className="text-sm text-gray-600">Quantidade: {cartProducts.quantidade}</p>

            <div className="flex gap-2 mt-2">

             <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" onClick={() => addToCart(cartProducts)}>+</button>  

             <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => removeFromCart(cartProducts.id)}>-</button> 
            </div>

        </div>
    )
}

export default Cart;
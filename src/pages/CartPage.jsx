import React from "react";
import Cart from "../components/Cart.jsx";
import { Link } from "react-router-dom";

function CartPage({ cart, addToCart, removeFromCart }) {
  const totalGeral = cart.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0,
  );

  const totalItens = cart.reduce((total, item) => total + item.quantidade, 0);

  return (
    <div className="container mx-auto p-6 max-w-5xl min-h-[80vh]">
      <h1 className="text-3xl font-bold mb-8 border-b pb-4 text-gray-800">
        Seu Carrinho
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed">
          <p className="text-gray-500 text-xl mb-6">Seu carrinho está vazio.</p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition shadow-md"
          >
            Voltar para as Compras
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 bg-white rounded-2xl border p-6 shadow-sm space-y-2">
            {cart.map((product) => (
              <Cart
                key={product.id}
                cartProducts={product}
                removeFromCart={removeFromCart}
                addToCart={addToCart}
              />
            ))}
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl border shadow-sm sticky top-24">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Resumo da Compra
            </h2>

            <div className="flex justify-between text-gray-600 mb-2">
              <span>Total de itens:</span>
              <span>{totalItens}</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-4">
              <span>Entrega:</span>
              <span className="text-green-600 font-medium">Grátis</span>
            </div>

            <div className="border-t pt-4 flex justify-between items-center mb-6">
              <span className="text-lg font-bold text-gray-800">
                Valor Total:
              </span>
              <span className="text-2xl font-bold text-green-600">
                {totalGeral.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>

            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl transition shadow-md hover:shadow-lg transform active:scale-[0.98]">
              Finalizar Pedido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage
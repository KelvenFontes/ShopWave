"use client"

import { BsTrash } from 'react-icons/bs';
import Image from "next/image";
import { formatPrice } from '@/providers/formatCurrency';
import { useState } from 'react';

const ProductCard = () => {

  const product = [
    {
      imagem: '/teste'
    },
    {
      nome: 'teste'
    }
  ]

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="bg-gray-50 shadow-md rounded-lg p-4 mt-3 w-[90%] ml-[5%]">
      <div className="flex">
        <div className="flex-shrink-0 w-24 h-24 mr-4 flex items-center">
          <div className="relative h-24 w-24 mt-6">
            {product.imagem ? (
              <Image src={product.imagem} alt={product.nome} height={100} width={100} className="w-full" />
            ) : (
              <Image src="/produto-sem-imagem.png" alt="Default Product" height={100} width={100} className="w-full" />
            )}
          </div>
        </div>
        <div className="flex-grow">
          <h2 className="text-lg font-semibold">titulo</h2>
          <p className="text-gray-600">descriçao</p>
          <p className="text-primaryDarker font-bold mt-2">{formatPrice(19)}</p>
          <div className="flex items-center mt-2">
            <button className="text-primary hover:text-primaryDarker mr-2" onClick={decreaseQuantity} >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <span className="text-gray-600">{quantity}</span>

            <button className="text-primary hover:text-primaryDarker ml-2" onClick={increaseQuantity}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>

        </div>
      </div>
      <div className="mt-4 border-t border-gray-400">
        <button className="flex items-center gap-2 text-red-600 hover:text-[#ff0000] hover:font-semibold text-base mt-3">
          <BsTrash />
          Remove
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

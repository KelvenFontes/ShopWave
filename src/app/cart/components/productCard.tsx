"use client"

import { BsTrash } from 'react-icons/bs';
import Image from "next/image";
import { formatPrice } from '@/providers/formatCurrency';
import { useEffect, useState } from 'react';
import Produto from '@/types/Product';

interface ProductCardProps {
  product: string,
  quantity: number;
  onRemove: () => void;
}

const ProductCard = ({ product, quantity, onRemove }: ProductCardProps) => {

  const [quantiti, setQuantity] = useState(quantity);
  const [produto, setProduto] = useState<Produto[] | any>([]);



  useEffect(() => {

    const Products = async () => {
      const response = await fetch(`https://api-fatec.onrender.com/api/v1/product/${product}`);
      const data = await response.json();
      setProduto(data);
    };

    Products();

  }, [product]);



  const increaseQuantity = () => {
    setQuantity(quantiti + 1);
  };

  const decreaseQuantity = () => {
    if (quantiti > 1) {
      setQuantity(quantiti - 1);
    }
  };

  const handleRemove = () => {
    // Aqui você pode remover o produto do carrinho (estado) e atualizar o localStorage
    onRemove();
  };

  if (!produto) {
    return null; // Renderizar alguma coisa enquanto os dados estão sendo carregados
  }

  return (
    <div className="bg-gray-50 shadow-md rounded-lg p-4 mt-3 w-[90%] ml-[5%]">
      <div className="flex">
        <div className="flex-shrink-0 w-24 h-24 mr-4 flex items-center">
          <div className="relative h-24 w-24 mt-6">
            {false ? (
              <Image src={''} alt={'product.nome'} height={100} width={100} className="w-full" />
            ) : (
              <Image src="/produto-sem-imagem.png" alt="Default Product" height={100} width={100} className="w-full" />
            )}
          </div>
        </div>
        <div className="flex-grow">
          <h2 className="text-lg font-semibold">{produto.nome}</h2>
          <p className="text-gray-600 text-sm">
            {produto.descricao && produto.descricao.length > 30
              ? `${produto.descricao.slice(0, 30)}...`
              : produto.descricao}

          </p>
          <p className="text-primaryDarker font-bold mt-2">{formatPrice(19)}</p>
          <div className="flex items-center mt-2">
            <button className="text-primary hover:text-primaryDarker mr-2" onClick={decreaseQuantity} >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <span className="text-gray-600">{quantiti}</span>

            <button className="text-primary hover:text-primaryDarker ml-2" onClick={increaseQuantity}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>

        </div>
      </div>
      <div className="mt-4 border-t border-gray-400">
        <button className="flex items-center gap-2 text-red-600 hover:text-[#ff0000] hover:font-semibold text-base mt-3" onClick={handleRemove}>
          <BsTrash />
          Remove
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
function onRemove() {
  throw new Error('Function not implemented.');
}


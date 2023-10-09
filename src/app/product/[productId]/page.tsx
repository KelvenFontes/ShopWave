"use client"

import Button from "@/components/Button";
import { formatPrice } from "@/providers/formatCurrency";
import CartItem from "@/types/Cart";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

// eslint-disable-next-line @next/next/no-async-client-component
const ProductDetails = async ({ params }: { params: { productId: string } }) => {

  const getProductDetails = async (productId: string) => {
    const response = await fetch(`https://api-fatec.onrender.com/api/v1/product/${productId}`);
    const products = await response.json();

    return products;
  };

  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (productId: string) => {
    const newItem: CartItem = {
      productId, quantity: 1,
      id: ""
    }; // Defina a quantidade inicial como 1
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Verifique se o produto já existe no carrinho
    const existingItemIndex = existingCart.findIndex((item: { productId: string; }) => item.productId === productId);

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += 1; // Se existe, aumente a quantidade
    } else {
      existingCart.push(newItem); // Se não existe, adicione o novo item
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    setCart(existingCart);

  };

  const product = await getProductDetails(params.productId);


  if (!product) return null;

  return (
    <div className="container mx-auto mt-8 lg:mt-12 lg:px-40">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        <div className="relative h-[300px] w-full lg:h-[400px]">
          {product.images ? (
            <Image src={product.images[0].image_path} alt={product.desc} layout="fill" objectFit="cover" />
          ) : (
            <Image src="/produto-sem-imagem.png" alt="Default Product" layout="fill" objectFit="cover" />
          )}
        </div>
        <div className="mt-5 mx-1.5 flex flex-col justify-between h-full">
          <h2 className="text-2xl font-semibold">{product.desc}</h2>
          {/* <p className="lg:text-xl lg:text-gray-600 lg:mt-[-50px]">
            {product.descricao.length > 100 ? `${product.descricao.slice(0, 100)}...` : product.descricao}
          </p> */}
          <p className="text-primaryDarker text-xl font-bold mt-1 lg:mt-[-50px]">{formatPrice(product.price)}</p>
          <p className="mt-2 text-gray-500 lg:mt-[-50px]">Stock: {product.stock}</p>
          <div className="flex items-center justify-between lg:mb-[30px]">
            <Button variant="outlined" className="w-[48%] mt-2 font-semibold text-lg" onClick={() => handleAddToCart(product.id)}>
              <Link href="/cart">
                Add to Cart
              </Link>
            </Button>
            {/* <Button variant="border" className="w-[48%] mt-2 font-semibold text-lg">
              buy now
            </Button> */}
          </div>
        </div>


        <div className="mt-10 mx-1.5 border-y pb-4 pt-6 border-gray-300 lg:mt-0 lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Description</h2>
          {/* <p className="text-gray-700 leading-relaxed">
            {product.descricao}
          </p> */}
        </div>

        <div className="my-10 mx-1.5 border-b pb-1 border-gray-300 lg:mt-0 lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
          <table className="w-full border rounded-lg overflow-hidden">
            <tbody>
              <tr className="bg-gray-100">
                <td className="font-semibold px-6 py-3">Brand:</td>
                <td className="px-6 py-3">{product.brand}</td>
              </tr>
              <tr className="bg-white">
                <td className="font-semibold px-6 py-3">Width:</td>
                <td className="px-6 py-3">{product.width} cm</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="font-semibold px-6 py-3">Height:</td>
                <td className="px-6 py-3">{product.height} cm</td>
              </tr>
              <tr className="bg-white">
                <td className="font-semibold px-6 py-3">Weight:</td>
                <td className="px-6 py-3">{product.weight} kg</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;

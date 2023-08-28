'use client'

import { AiOutlineArrowLeft } from "react-icons/ai";
import ProductCard from "./components/productCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import CartItem from "@/types/Cart";

const Cart = () => {

  const [isCustomerRegistered, setIsCustomerRegistered] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  // const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    const nomeLocalStorage = localStorage.getItem("nome");
    const sobrenomeLocalStorage = localStorage.getItem("sobrenome");
    const cartItemsFromLocalStorage = localStorage.getItem("cart");

    if (nomeLocalStorage && sobrenomeLocalStorage) {
      setIsCustomerRegistered(true);
      // setCustomerName(`${nomeLocalStorage} ${sobrenomeLocalStorage}`);
    }

    if (cartItemsFromLocalStorage) {
      const parsedCartItems = JSON.parse(cartItemsFromLocalStorage);
      setCartItems(parsedCartItems);
    }
  }, []);

    const handleRemoveProduct = (productId: string) => {
      const updatedCartItems = cartItems.filter(item => item.productId !== productId);
      setCartItems(updatedCartItems);
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    };

  return (
    <div className='container mx-auto pl-2 mt-8'>

      <div className="flex items-center gap-2">
        <Link href={"/"}>
          <AiOutlineArrowLeft size={25} className="cursor-pointer" />
        </Link>
        <h1 className="font-bold text-xl">My Cart</h1>
      </div>

      {isCustomerRegistered ? (
        <>
          {cartItems.map((cartItem, index) => (
            <ProductCard key={index} product={cartItem.productId} quantity={cartItem.quantity} onRemove={() => handleRemoveProduct(cartItem.productId)} />
          ))}
        </>
      ) : (
        <div className="mt-4">
          <p>Por favor, cadastre-se para visualizar o carrinho.</p>
          <Link href={"/register"}>
            <p className="text-blue-500 hover:underline">Cadastre-se</p>
          </Link>
        </div>
      )}
    </div>

  );
}

export default Cart;

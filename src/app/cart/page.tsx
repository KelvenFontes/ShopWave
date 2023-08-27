'use client'

import { AiOutlineArrowLeft } from "react-icons/ai";
import ProductCard from "./components/productCard";
import Link from "next/link";
import { useEffect, useState } from "react";

const Cart = () => {

  const [isCustomerRegistered, setIsCustomerRegistered] = useState(false);

  useEffect(() => {
    const customerData = localStorage.getItem("customerData");
    if (customerData) {
      setIsCustomerRegistered(true);
    }
  }, []);

  return (
    <div className='container mx-auto pl-2 mt-8'>

      <div className="flex items-center gap-2">
        <Link href={"/"}>
          <AiOutlineArrowLeft size={25} className="cursor-pointer" />
        </Link>
        <h1 className="font-bold text-xl">My Cart</h1>
      </div>

      {/* {isCustomerRegistered ? (
        <> */}
      <ProductCard />
      <ProductCard />
      {/* </>
      ) : (
        <div className="mt-4">
          <p>Por favor, cadastre-se para visualizar o carrinho.</p>
          <Link href={"/register"}>
            <p className="text-blue-500 hover:underline">Cadastre-se</p>
          </Link>
        </div>
      )} */}
    </div>

  );
}

export default Cart;

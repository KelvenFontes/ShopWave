import { AiOutlineArrowLeft } from "react-icons/ai";
import ProductCard from "./components/productCard";
import Link from "next/link";

const Cart = () => {

  return (
    <div className='container mx-auto pl-2 mt-8'>
      <div className='flex items-center gap-2'>
        <Link href={'/'}>
          <AiOutlineArrowLeft size={25} className='cursor-pointer' />
        </Link>
        <h1 className='font-bold text-xl'>My Cart</h1>
      </div>
      <ProductCard />
      <ProductCard />
    </div>

  );
}

export default Cart;

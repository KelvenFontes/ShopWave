import Button from "@/components/Button";
import { formatPrice } from "@/providers/formatCurrency";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProductItem = () => {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const Products = async () => {
    const response = await fetch('https://api-fatec.onrender.com/api/v1/product');
    const data = await response.json();
    setProducts(data);
    setIsLoading(false);
  }

  useEffect(() => {

    Products();

  }, []);

  return (
    <div className="container grid grid-cols-2 gap-4">

      {isLoading && (
        <div className='flex items-center justify-center mt-16'>
          <div className="h-12 w-12 border-4 border-l-gray-200 border-r-gray-200 border-b-gray-200 border-t-primary animate-spin ease-linear rounded-full"></div>
        </div>
      )}

      {isLoading && (
        <div className='flex items-center justify-center mt-16'>
          <div className="h-12 w-12 border-4 border-l-gray-200 border-r-gray-200 border-b-gray-200 border-t-primary animate-spin ease-linear rounded-full"></div>
        </div>
      )}

      {!isLoading &&
        products.map((product: any) => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <div className="bg-gray-50 shadow-md rounded-lg overflow-hidden h-88 hover:shadow-xl transition duration-200">
              <div className="p-4 flex flex-col h-full justify-center">
                <div className="w-9/10 mt-1"> {/* Defina a largura da imagem */}
                  {product.imagem ? (
                    <Image src={product.imagem} alt={product.nome} height={100} width={100} className="w-full" />
                  ) : (
                    <Image src="/produto-sem-imagem.png" alt="Default Product" height={100} width={100} className="w-full" />
                  )}
                </div>
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold mb-2">{product.nome}</h2>
                  <p className="text-gray-600">
                    {product.descricao.length > 20
                      ? `${product.descricao.slice(0, 20)}...`
                      : product.descricao}
                  </p>
                </div>
                <p className="text-primaryDarker mt-2 font-bold text-xl">{formatPrice(product.preco)}</p>
                <Button>Add to cart</Button>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default ProductItem;

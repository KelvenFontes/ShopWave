import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProductItem = () => {

  const [products, setProducts] = useState([]);

  const Products = async () => {
    const response = await fetch('https://api-fatec.onrender.com/api/v1/product');
    const data = await response.json();
    setProducts(data);
    console.log(products);
  }

  useEffect(() => {

    Products();

  }, []);

  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2)}`;
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {products.map((product: any) => (
        <Link href={`/product/${product.id}`} key={product.id}>
          <div className="bg-white shadow-md rounded-lg overflow-hidden h-60 hover:shadow-xl transition duration-200">
            <div className="p-4 flex flex-col h-full">
              <div className="mt-4">
                {product.imagem ? (
                  <Image src={product.imagem} alt={product.nome} height={100} width={100} />
                ) : (
                  <Image src="/produto-sem-imagem.png" alt="Default Product" height={100} width={100} />
                )}
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-semibold mb-2">{product.nome}</h2>
                <p className="text-gray-600">
                  {product.descricao.length > 50
                    ? `${product.descricao.slice(0, 30)}...`
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

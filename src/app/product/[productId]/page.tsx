import { formatPrice } from "@/providers/formatCurrency";
import Image from "next/image";

const getProductDetails = async (productId: string) => {
  const response = await fetch(`https://api-fatec.onrender.com/api/v1/product/${productId}`);
  const products = await response.json();

  console.log(products);
  return products;
};

const ProductDetails = async ({ params }: { params: { productId: string } }) => {

  const product = await getProductDetails(params.productId);

  console.log(product);

  if (!product) return null;

  return (
    <div className="container mx-auto mt-5 lg:px-40 lg:pt-10">
      <div className="relative h-[300px] w-full">
        {product.imagem ? (
          <Image src={product.imagem} alt={product.nome} layout="fill" objectFit="cover" />
        ) : (
          <Image src="/produto-sem-imagem.png" alt="Default Product" layout="fill" objectFit="cover" />
        )}
      </div>
      <div className="mt-5">
        <h1 className="text-3xl font-semibold">{product.nome}</h1>
        <p className="text-gray-600 mt-2">{product.descricao}</p>
        <p className="text-primaryDarker text-2xl font-bold mt-3">{formatPrice(product.preco)}</p>
        <button className="mt-4 bg-primary hover:bg-primaryDarker text-white px-6 py-3 rounded-md font-semibold transition duration-300">
          Add to Cart
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p className="text-gray-700">{product.descricao}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
        <table className="w-full">
          <tbody>
            <tr>
              <td className="font-semibold pr-4">Height:</td>
              <td>{product.altura} cm</td>
            </tr>
            <tr>
              <td className="font-semibold pr-4">Weight:</td>
              <td>{product.peso} kg</td>
            </tr>
            {/* Adicione mais linhas de informações aqui */}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ProductDetails;

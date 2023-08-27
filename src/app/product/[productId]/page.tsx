import { formatPrice } from "@/providers/formatCurrency";
import Image from "next/image";

const getProductDetails = async (productId: string) => {
  const response = await fetch(`https://api-fatec.onrender.com/api/v1/product/${productId}`);
  const products = await response.json();

  return products;
};

const ProductDetails = async ({ params }: { params: { productId: string } }) => {

  const product = await getProductDetails(params.productId);

  if (!product) return null;

  return (
    <div className="container mx-auto mt-8 lg:px-40">
      <div className="relative h-[300px] w-full">
        {product.imagem ? (
          <Image src={product.imagem} alt={product.nome} layout="fill" objectFit="cover" />
        ) : (
          <Image src="/produto-sem-imagem.png" alt="Default Product" layout="fill" objectFit="cover" />
        )}
      </div>
      <div className="mt-5">
        <h2 className="text-2xl font-semibold">{product.nome}</h2>
        {/* <p className="text-gray-600 mt-2">{product.descricao}</p> */}
        <p className="text-primaryDarker text-xl font-bold mt-1">{formatPrice(product.preco)}</p>
        <p className="mt-6 text-gray-500">Stock: {product.estoque}</p>
        <button className="mt-4 bg-primary hover:bg-primaryDarker text-white px-6 py-3 rounded-md font-semibold transition duration-300">
          Add to Cart
        </button>
      </div>


      <div className="mt-10 border-b pb-4 border-gray-300 bg-gray-400">
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p className="text-gray-700 leading-relaxed">
          {product.descricao}
        </p>
      </div>

      <div className="my-10 border-b pb-1 border-gray-300">
        <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
        <table className="w-full border rounded-lg overflow-hidden">
          <tbody>
            <tr className="bg-gray-100">
              <td className="font-semibold px-6 py-3">Brand:</td>
              <td className="px-6 py-3">{product.marca}</td>
            </tr>
            <tr className="bg-white">
              <td className="font-semibold px-6 py-3">Width:</td>
              <td className="px-6 py-3">{product.largura} cm</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="font-semibold px-6 py-3">Height:</td>
              <td className="px-6 py-3">{product.altura} cm</td>
            </tr>
            <tr className="bg-white">
              <td className="font-semibold px-6 py-3">Weight:</td>
              <td className="px-6 py-3">{product.peso} kg</td>
            </tr>
            {/* Adicione mais linhas de detalhes aqui */}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ProductDetails;

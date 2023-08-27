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
    <div className="container mx-auto lg:px-40 lg:pt-10">

      {product.imagem ? (
        <Image src={product.imagem} alt={product.nome} height={200} width={200} />
      ) : (
        <Image src="/produto-sem-imagem.png" alt="Default Product" height={200} width={200} />
      )}
      <h1>{product.nome}</h1>
    </div>
  );
};
export default ProductDetails;

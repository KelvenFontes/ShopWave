import Image from "next/image";

const Footer = () => {

  const data = new Date();
  const ano = data.getFullYear();

  return (
    <div className="bg-walterWhite p-5 justify-center flex flex-col items-center">

      <Image src='/logo.png' width={133} height={23} alt='TripWise' />
      <p className='text-sm font-medium  mt-1 text-primaryDarker'>&copy; {ano} ShopWave. Todos os direitos reservados.</p>

    </div>
  );
};

export default Footer;

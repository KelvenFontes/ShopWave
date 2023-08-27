import { useEffect, useState } from 'react';
import Image from 'next/image';
import { BsPhone } from 'react-icons/bs';
import { HiMiniComputerDesktop } from 'react-icons/hi2';
import { MdOutlineComputer, MdStore } from 'react-icons/md';
import { AiTwotoneTablet } from 'react-icons/ai';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import Link from 'next/link';

const Categories = () => {

  const slideLeft = () => {
    const slider = document.getElementById('slider');
    if (slider) {
      slider.scrollLeft = slider.scrollLeft - 500;
    }
  };

  const slideRight = () => {
    const slider = document.getElementById('slider');
    if (slider) {
      slider.scrollLeft = slider?.scrollLeft! + 500
    }
  };

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategories = async () => {
    const response = await fetch('https://api-fatec.onrender.com/api/v1/category');
    const data = await response.json();
    setCategories(data);
    setIsLoading(false);
  };

  useEffect(() => {

    fetchCategories();

  }, []);

  return (
    <div className="container mx-auto mt-5 lg:mt-10">
      <h2 className="ml-5 font-semibold text-lg">Categories</h2>

      {isLoading && (
        <div className='flex items-center justify-center'>
          <div className="h-12 w-12 border-4 border-l-gray-200 border-r-gray-200 border-b-gray-200 border-t-primary animate-spin ease-linear rounded-full"></div>
        </div>
      )}

      {!isLoading && categories.length === 0 && (
        <div className='flex items-center justify-center'>
          <p>Não há categories disponíveis.</p>
        </div>
      )}

      {!isLoading && (
        <div className='relative flex items-center pt-3'>
          <SlArrowLeft className='opacity-50 cursor-pointer' onClick={slideLeft} size={40} />
          <div id='slider' className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide'>

            {categories.map((category: any) => (
              <div key={category.id} className='inline-block cursor-pointer pr-6'>

                {category.nome === 'Varejista' && (
                  <Link href={`/products/search/${category.id}`}>
                    <div className='text-orange-400 flex flex-col items-center justify-center'>
                      <MdStore size={40} />
                      <p className='font-semibold'>Stores</p>
                    </div>
                  </Link>
                )}

                {category.nome === 'Celulares' && (
                  <Link href={`/products/search/${category.id}`}>
                    <div className='text-blue-500 flex flex-col items-center justify-center'>
                      <BsPhone size={40} />
                      <p className='font-semibold'>Phones</p>
                    </div>
                  </Link>
                )}

                {category.nome === 'Tablets' && (
                  <Link href={`/products/search/${category.id}`}>
                    <div className='text-gray-500 flex flex-col items-center justify-center'>
                      <AiTwotoneTablet size={40} />
                      <p className='font-semibold'>Tablet</p>
                    </div>
                  </Link>
                )}

                {category.nome === 'Computadores' && (
                  <Link href={`/products/search/${category.id}`}>
                    <div className='text-primary flex flex-col items-center justify-center'>
                      <HiMiniComputerDesktop size={40} />
                      <p className='font-semibold'>Computer</p>
                    </div>
                  </Link>
                )}

                {category.nome === 'Notebooks' && (
                  <Link href={`/products/search/${category.id}`}>
                    <div className='text-purple-500 flex flex-col items-center justify-center'>
                      <MdOutlineComputer size={40} />
                      <p className='font-semibold'>Notebook</p>
                    </div>
                  </Link>
                )}

              </div>

            ))}

          </div>
          <SlArrowRight className='opacity-50 cursor-pointer' onClick={slideRight} size={40} />
        </div>
      )}

    </div >

  );
}

export default Categories;

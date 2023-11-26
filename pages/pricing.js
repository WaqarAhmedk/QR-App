import PricingCard from '@/components/PricingCard';
import { QR_PRICING } from '@/utils/mock';
import Image from 'next/image';
import React, { useState } from 'react';
import Toggle from '@/components/macros/Toggle';
import { useRouter } from 'next/router';

const Pricing = () => {
  const router = useRouter('/');
  const [isAnnual, setIsAnnual] = useState();

  const handleToggle = (event) => {
    const value = event.target.checked;
    setIsAnnual(value);
  };
  return (
    <section className=' layout-container padding-x text-[#303038]'>
      <div className='bg-white shadow-md px-[15px] sm:px-[34px] pt-16 flex flex-col items-center    '>
        {router.pathname.includes('plan-expired') && (
          <div className='flex flex-col gap-4 items-center mb-4'>
            <p className='text-primary font-medium text-lg'>
              Your subscription/free trial has expired. Please choose a plan to
              continue service.
            </p>

            <p>
              You Qr Codes are safe but inactive Choose a plan to re-activate
              them.
            </p>
          </div>
        )}

        <div className='flex flex-col gap-3 text-center justify-center'>
          <p className='heading font-bold'>Payment Plans</p>
          <p className='breif text-t1'>Choose a plan that's right for you</p>
          <div className='flex justify-between items-center gap-3 relative'>
            <p className='breif text-t1'>Pay Monthly</p>
            <div>
              <label className='switch scale-75'>
                <input type='checkbox' onChange={handleToggle} />
                <span className='slider round'></span>
              </label>
            </div>
            <div className='relative'>
              <p className='breif text-t1'>Pay Annual</p>
              <Image
                src='/assets/svgs/Pricing/yearly-underline.svg'
                alt='underline'
                width={100}
                height={100}
                className='absolute hidden md:block'
              />
            </div>
            <Image
              src='/assets/images/save25.png'
              alt='save25Percent'
              width={180}
              height={180}
              unoptimized
              className='hidden md:block absolute -right-48 -bottom-5'
            />
          </div>
        </div>

        <div className=' w-full overflow-auto'>
          <div className='w-full h-[1px] bg-gray-200 mt-12' />
          <div className='grid grid-cols-6 min-w-[1000px]'>
            {QR_PRICING.map((item, key) => {
              return <PricingCard isAnnual={isAnnual} {...item} key={key} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

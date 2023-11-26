import React from 'react';
import Image from 'next/image';
import { useFormContext, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Button from '../macros/Button';

function PreviewMenu(props) {
  const products = useWatch({ name: 'products' });

  const { control } = useFormContext();
  const {
    shopName,
    description,
    coverImage,
    preview,
    menuName,
    storeLink,
    buttonName,
  } = useWatch(control, {
    name: [
      'shopName',
      'description',
      'coverImage',
      'preview',
      'menuName',
      'storeLink',
      'buttonName',
    ],
  });

  const state = useSelector((state) => state.barCode);

  const textColor = preview?.textColor;
  const bgColor = preview?.bgColor;
  const borderColor = preview?.borderColor;
  const buttonColor = preview?.buttonColor;
  const has = products.some(
    (item) => item.name?.length > 0 || item?.price?.length > 0
  );
  const menuWrapper = `rounded-md grid gap-x-4 gap-y-14 mt-[50px] place-items-center ${
    products.length > 0 && has && products.length === 1
      ? 'grid-cols-1'
      : products.length > 0 && products.length > 1
      ? 'grid-cols-2'
      : products.length === 0
      ? 'grid-cols-2'
      : 'grid-cols-2'
  }`;

  const handleOpenStore = () => {
    if (storeLink) {
      window.location.href = storeLink;
    }
  };
  return (
    <div className='lg:mt-3 break-words   rounded-[10px]'>
      <div
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
          borderWidth: '7px',
        }}
        className='bg-white min-h-[500px]  relative pb-[100px] rounded-[5px] h-full rounded-t-[10px] items-center flex-column'
      >
        <div className='w-full  relative'>
          <Image
            src={
              state?.coverImage?.preview ||
              state?.coverImage?.url ||
              '/assets/images/restaurant.png'
            }
            width={100}
            height={100}
            className='w-full max-h-[150px] object-fill rounded-t-[5px]'
            alt='restaurant'
            unoptimized
          />
          <div className='absolute bottom-0 bg-[rgba(0,0,0,0.4)] w-full p-4'>
            <p className='text-white'>{shopName || 'Shop Name'}</p>
          </div>
        </div>
        <div className='flex-column gap-3 p-2 '>
          <p
            className='text-center break-all px-2 text-xl font-[500] mt-3'
            style={{ color: textColor }}
          >
            {menuName || 'Menu'}
          </p>
          <p className='break-all text-center'>
            {description ||
              'Presented with impeccable service in a captivating ambiance'}
          </p>
        </div>
        <div className={menuWrapper}>
          {has && products.length > 0
            ? products?.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{ background: item?.bgColor }}
                    className='relative rounded-[5px] shadow-sm bg-white p-2 h-[105px] min-w-[125px] text-ellipsis max-w-[125px] flex items-center justify-center'
                  >
                    <div className='mt-4 text-center text-ellipsis justify-between flex-column'>
                      <p style={{ color: item?.textColor }}>
                        {item?.name
                          ? item?.name?.substring(0, 12) +
                            (item?.name?.length >= 15 ? '...' : '')
                          : ''}
                      </p>
                      <p
                        style={{ color: item?.textColor }}
                        className='text-ellipsis font-bold'
                      >
                        {item?.price}$
                      </p>
                    </div>

                    <Image
                      src={
                        item?.image?.preview ||
                        item?.image ||
                        '/assets/svgs/food.svg'
                      }
                      width={57}
                      height={57}
                      alt='food'
                      style={{
                        maxWidth: '57px',
                        maxHeight: '57px',
                      }}
                      className='absolute rounded-full min-w-[57px] min-h-[57px] -top-9 left-0 right-0 m-auto '
                    />
                  </div>
                );
              })
            : [1, 2, 3, 4].map((_, index) => {
                return (
                  <div
                    key={index}
                    className='relative rounded-[5px] shadow-main bg-white p-2 h-[105px] min-w-[125px] text-ellipsis max-w-[125px] flex items-center justify-center'
                  >
                    <div className='mt-4 text-center text-ellipsis justify-between flex-column'>
                      <p>Pizza</p>
                      <p className='text-ellipsis font-bold'>20$</p>
                    </div>

                    <Image
                      src={'/assets/svgs/food.svg'}
                      width={57}
                      height={57}
                      alt='food'
                      style={{
                        maxWidth: '57px',
                        maxHeight: '57px',
                      }}
                      className='absolute rounded-full -top-9 left-0 right-0 m-auto '
                    />
                  </div>
                );
              })}
        </div>
        <div
          className='primary-button font-medium text-lg cursor-pointer text-center w-[90%] absolute bottom-2  min-h-[50px]'
          style={{
            background: buttonColor,
          }}
          onClick={handleOpenStore}
        >
          {buttonName && buttonName?.length > 20
            ? `${buttonName?.slice(0, 20)}...`
            : buttonName || 'Visit Us'}
        </div>
      </div>
    </div>
  );
}

export default PreviewMenu;

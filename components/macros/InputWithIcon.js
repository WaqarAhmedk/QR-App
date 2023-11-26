import Image from 'next/image';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const InputWithIcon = (props) => {
  const { register, formState } = useFormContext();
  const { inputLabel, placeholder, name, classNames, width, bg, index, type } =
    props;
  const errors = formState.errors;
  // console.log('ERORR', errors);

  return (
    <div className={`${width} `}>
      {inputLabel && (
        <label className='block mb-2  font-medium text-gray-90'>
          {inputLabel}
        </label>
      )}
      <div className=' relative overflow-hidden rounded-[12px] flex items-center '>
        <input
          type='text'
          name={name}
          placeholder={placeholder}
          className={`${
            bg === 'light' ? '#ffffff' : 'bg-light'
          } placeholder-gray  pl-[55px] placeholder-gray border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-gray-700 text-sm  block w-full h-[45px] "
          placeholder={placeholder} ${classNames}`}
          {...(name ? register(name) : {})}
        />
        <div className='absolute left-0 bg-[#52525B] py-4 px-3'>
          <Image
            src={`/assets/svgs/social/${
              type.includes('website') ? 'website' : type
            }-colored.svg`}
            height={25}
            width={25}
            alt='fb'
          />
        </div>
      </div>
      {errors?.links?.[index]?.url?.message && (
        <span className='text-primary text-xs'>
          {errors.links[index]?.url?.message}
        </span>
      )}
    </div>
  );
};

export default InputWithIcon;

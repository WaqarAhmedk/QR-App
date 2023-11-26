import React from 'react';
import Image from 'next/image';
import Loader from './Loader';

function Button({
  text,
  onClick,
  type,
  className,
  buttonClass,
  checkEnable,
  actionType,
  loading,
  disable,
}) {
  return (
    <div
      className={`relative m-auto ${className}  object-contain flex items-center`}
    >
      {checkEnable && (
        <Image
          src='/assets/images/arrow-check.png'
          width={20}
          height={20}
          alt='check_arrow'
          unoptimized
          className='absolute -right-2 -top-[10px] z-10'
        />
      )}

      <button
        onClick={onClick}
        type={actionType}
        disabled={loading || disable}
        className={`
        w-full    
        text-base 
        rounded-[7px]
         ${
           type === 'fill'
             ? 'gradient  lg:px-[20px] py-[5px] lg:py-[10px] text-white'
             : type === 'WhiteFill'
             ? 'bg-white text-primary'
             : 'gradient-border py-1 lg:px-4 lg:py-2 text-primary'
         }
        ${buttonClass}`}
      >
        {text}
      </button>
    </div>
  );
}

export default Button;

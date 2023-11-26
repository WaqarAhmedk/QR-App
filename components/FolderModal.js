import React, { useRef, useEffect } from 'react';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import Image from 'next/image';
import { disableStyling } from '@/utils/functions';

const FolderModal = ({
  open,
  handleClose,
  children,
  iconType = 'normal',
  className,
  notCrossIcon,
  style,
  childrenClass,
}) => {
  const ref = useRef();

  // useOnClickOutside(ref, () => handleClose())
  useEffect(() => {
    // 27 is the key code for escape
    function handleKeyDown(event) {
      if (event.keyCode === 27) {
        handleClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const crossIconClass = `absolute 
   font-bold rounded-full cursor-pointer
   w-[14px] h-[14px] lg:w-[20px] lg:h-[20px] ${
     iconType == 'outside'
       ? 'right-0 -top-10 '
       : 'right-5 bg-white  top-5 fill-black'
   }`;
  const handleModalClose = (e) => {
    handleClose();
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <>
      {open && (
        <div
          className='w-screen h-screen bg-[green] z-50 right-0 top-0 fixed shadow bg-background flex justify-center items-center m-0'
          style={{
            backgroundColor: disableStyling()
              ? 'rgba(0, 0, 0, 0.1)'
              : 'rgba(0, 0, 0, 0.9)',
            margin: '0px',
          }}
        >
          <div
            className={`relative bg-background ${
              iconType === 'normal' ? 'py-4' : 'pt-0'
            }  rounded-[5px] shadow-md bg-white max-h-[500px]  ${className}`}
            ref={ref}
            style={style}
          >
            <div className='text-center text-xl mb-4'>Campaign Name</div>
            <hr className='mb-4' />
            <div
              className={`flex flex-col items-center justify-center w-full h-full ${childrenClass}`}
            >
              {children}
            </div>
            {notCrossIcon ? null : (
              <Image
                className={crossIconClass}
                src='/assets/svgs/icons/cross_icon.svg'
                alt='icon'
                width={12}
                unoptimized
                height={12}
                onClick={handleModalClose}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
export { FolderModal };

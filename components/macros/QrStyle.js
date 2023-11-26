import React, { useContext, useState } from 'react';
import Image from 'next/image';
import { QR_STYLE } from '@/utils/mock';
import { ToggleIcons } from './toggleIcon';
import { ARROW_ICONS as icons } from '@/utils/mock';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setDecorateModal, setModalTab } from '@/store/barCode/barCodeSlice';

function QrStyle() {
  const { setValue } = useFormContext();
  const [isOpen, setIsOpen] = useState(true);
  const [iconIndex, setIconIndex] = useState(0);
  const dispatch = useDispatch();

  const handleSelect = (type) => {
    setValue('qrStyle', type);
    if (type === 'logo') {
      // dispatch(setDecorateModal(true))
    }
    dispatch(setModalTab('UPLOAD LOGO'));
  };

  return (
    <div
      className='flex-column  p-4
     bg-light border border-grey rounded-[5px] w-full gap-4'
    >
      <div className='row-flex justify-between'>
        <p className='font-semibold'>QR style</p>
        <ToggleIcons
          {...{
            isOpen,
            setIconIndex,
            setIsOpen,
            height: 6,
            width: 11,
            icons,
            iconIndex,
          }}
        />
      </div>
      <div className='row-flex gap-5'>
        {isOpen &&
          QR_STYLE.map(({ image, title, type }, key) => (
            <span
              key={key}
              className='text-center space-y-2'
              onClick={() => handleSelect(type)}
            >
              <Image
                src={image}
                width={64}
                height={64}
                unoptimized
                className='cursor-pointer'
                alt='qr-code'
              />
              <p className='text-sm  text-t2'>{title}</p>
            </span>
          ))}
      </div>
    </div>
  );
}

export default QrStyle;

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSelectToggle, useDisable } from '@/utils/functions';

const ColorPallete2 = ({ pallete, palleteClass, onChange, type }) => {
  const [colorPallets, setColorPallets] = useState(pallete);

  useEffect(() => {
    if (type !== 'qr') {
      useSelectToggle(setColorPallets, 1, 'isSelected');
    }
  }, []);

  const handlePalleteChange = (id, index) => {
    useSelectToggle(setColorPallets, id, 'isSelected');
    let selectedPallets = pallete[index].palette;

    if (type === 'qr') {
      onChange(selectedPallets);
    } else if (type === 'Menu') {
      selectedPallets = {
        borderColor: selectedPallets[0].color,
        textColor: selectedPallets[1].color,
      };
      onChange(selectedPallets);
    } else {
      selectedPallets = {
        textColor: selectedPallets[0].color,
        iconsColor: selectedPallets[1].color,
      };
      onChange(selectedPallets);
    }
  };
  const handleRemove = (index) => {
    useDisable(setColorPallets, index, 'isSelected');
  };

  return (
    <div className='flex-column gap-5 mt-1 lg:mt-2'>
      <p className='text-base text-t1 font-medium'>Color palette*</p>
      <div className={palleteClass}>
        {colorPallets.map(({ palette, isSelected, id }, index) => (
          <div className='relative' key={index}>
            {isSelected && (
              <Image
                src='/assets/svgs/icons/cross.svg'
                width={20}
                height={20}
                alt='check_arrow'
                unoptimized
                className='absolute -right-2 cursor-pointer -top-[10px] z-10'
                onClick={() => handleRemove(id)}
              />
            )}
            <div
              onClick={() => handlePalleteChange(id, index)}
              className={`${
                isSelected
                  ? 'rounded-[5px]  border border-primary'
                  : 'rounded-[5px] border border-gray-200'
              }  row-flex p-1 justify-center cursor-pointer items-center gap-[10px]`}
            >
              {palette.map(({ color }, idx) => (
                <div
                  key={idx}
                  className={`cursor-pointer rounded-full border shadow-thin h-[25px] w-[25px] `}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPallete2;

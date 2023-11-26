import React, { useContext } from 'react';
import { COLOR_PALLETES_FRAMES, QR_FRAMES } from '@/utils/mock';
import InputColor from '../macros/inputColor';
import Input from '../macros/Input';
import { setPattern, setQrFrame } from '@/store/barCode/barCodeSlice';
import { useDispatch } from 'react-redux';
import { useFormContext } from 'react-hook-form';
import InputColorWithContext from '../macros/InputColorWithContext';

import {
  setFgColor,
  setQrFrameColor,
  setQrTextColor,
} from '@/store/barCode/barCodeSlice';
import { setSelectedPallets } from '@/utils/functions';
import ColorPallete2 from '../ColorPalette2';

function Frames() {
  const dispatch = useDispatch();
  const handleQrFrame = (type) => {
    if (type === 'frameBoldText') {
      dispatch(setQrFrameColor('#17B556'));
      dispatch(setQrTextColor('#000000'));

      dispatch(setQrFrame(type));
    } else if (type === 'frameSimple') {
      dispatch(setQrFrameColor('#ff5161'));
      dispatch(setQrTextColor('#ffffff'));
      dispatch(setQrFrame(type));
    } else if (type === 'frameRibbon') {
      dispatch(setQrFrameColor('#ff5161'));
      dispatch(setQrTextColor('#ffffff'));
      dispatch(setQrFrame(type));
    }
  };
  const { getValues, setValue } = useFormContext();

  const handleBtnTextChange = (e) => {
    setValue('qrFrameButtonText', e.target.value);
  };

  const handlePalletChange = (selectedPallets) => {
    dispatch(setQrFrameColor(selectedPallets.iconsColor));
    dispatch(setQrTextColor(selectedPallets.textColor));
    dispatch(setFgColor(selectedPallets.backGroundColor));
    setSelectedPallets(setValue, selectedPallets);
  };

  return (
    <>
      <div className='text-lg font-[500] px-4 lg:px-0 flex-column gap-5'>
        <div className='grid grid-cols-2 500:grid-cols-3 md:grid-cols-7 gap-4'>
          {QR_FRAMES.map((item, index) => {
            return (
              <div
                className='flex cursor-pointer items-center justify-center'
                onClick={() => {
                  handleQrFrame(item.type);
                }}
              >
                <img
                  src={item.image}
                  key={index}
                  className='object-contain'
                  alt='Image'
                />
              </div>
            );
          })}
        </div>
        <div className='xl:w-[40%] flex-column gap-2 text-base'>
          <label>Button Text</label>
          {/* <Input placeholder="Scan Me" name="qrFrameButtonText" /> */}
          <input
            maxLength={8}
            placeholder='Scan Me'
            defaultValue='Scan Me'
            className='input'
            onChange={handleBtnTextChange}
          />
        </div>
        <div className='xl:w-[85%] flex-column gap-2'>
          <p className='font-medium text-base'>Change QR Style</p>
          <div className='input-color-wrapper'>
            <InputColorWithContext
              name='qrFrameColor'
              inputLabel='Frame Color'
            />
            {/* <InputColorWithContext name='fgColor' inputLabel='QR color' /> */}
            <InputColorWithContext name='qrTextColor' inputLabel='Text color' />
          </div>
        </div>
        <div className='flex-column gap-2'>
          <p className='text-base lg:text-lg font-medium'>Pattern</p>
          <div className='lg:mr-5'>
            <ColorPallete2
              pallete={COLOR_PALLETES_FRAMES}
              palleteClass='color-palette-grid'
              onChange={handlePalletChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Frames;

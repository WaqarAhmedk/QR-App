import {
  COLOR_PALLETES_ADVANCE_LINKS,
  COLOR_PALLETES_COUPON,
  COLOR_PALLETES_QR,
} from '@/utils/mock';
import { SECONDS, HOURS, MINUTES } from '@/utils/mock';
import { useFormContext } from 'react-hook-form';
import ColorPallete from '../ColorPallete';
import DropDown from '../macros/DropDown';
import FileUpload from '../macros/FileUpload';
import Input from '../macros/Input';
import InputColor from '../macros/inputColor';
import InputGradient from '../macros/InputGradient';
import PremiumText from '../macros/PremiumText';
import React from 'react';
import Textarea from '../macros/TextArea';
import Toggle from '../macros/Toggle';

function Coupan() {
  const { setValue } = useFormContext();

  const handlePalleteChange = (pallete) => {
    setValue('preview.bgColor', pallete.backGroundColor);
    setValue('preview.textColor', pallete.textColor);
    setValue('preview.buttonColor', pallete.iconsColor);
  };

  return (
    <section className='flex-column gap-2'>
      <div className='text-lg font-medium'>
        <PremiumText text='Design' />
      </div>
      <div className='flex-column gap-6 '>
        <ColorPallete
          pallete={COLOR_PALLETES_COUPON}
          palleteClass='color-palette-flex'
          onChange={handlePalleteChange}
        />
        <div className='input-color-wrapper'>
          <InputColor
            name='preview.bgColor'
            contextFor='coupan'
            classNames='input-color-gap'
            inputLabel='Background Color'
          />
          <InputColor
            inputLabel='Button color'
            contextFor='coupan'
            name='preview.buttonColor'
          />
          <InputColor
            name='preview.textColor'
            inputLabel='Text color'
            contextFor='coupan'
            defaultColor='#ffffff'
          />
        </div>

        <div className='row-flex w-full gap-10 md:gap-40'>
          <FileUpload label='Cover Image' name='preview.coverImage' />
        </div>
        <div className='flex-column  gap-2 md:gap-4'>
          <div className='flex-column gap-2 md:gap-4'>
            <Input
              inputLabel='Coupon No*'
              classNames='input-color-gap'
              placeholder='e.g. CouponID100'
              defaultColor='#ffffff'
              name='couponNo'
            />
            <Input
              inputLabel='Sales Badge*'
              classNames='input-color-gap'
              placeholder='10%  OFF'
              defaultColor='#ffffff'
              name='salePercentage'
            />
          </div>
          <div className=''>
            <p className='block text-sm lg:text-base mb-2 font-medium text-gray-90'>
              Coupon timer
            </p>
            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
              <DropDown
                name='couponTime.hours'
                title='Select hours'
                listItems={HOURS}
              />
              <DropDown
                name='couponTime.minutes'
                title='Select Minutes'
                listItems={MINUTES}
              />
              <DropDown
                name='couponTime.seconds'
                title='Select Seconds'
                listItems={SECONDS}
              />
            </div>
          </div>
          <Textarea
            inputLabel='Coupon Details'
            placeholder='Enter Coupon Detail..'
            name='couponDetails'
          />
          {/* <Input
            inputLabel='Valid Until'
            placeholder='Mar 18, 2023'
            defaultColor='#ffffff'
            type='date'
            classNames='cursor-pointer'
            name='validUntil'
          /> */}
          <div className='flex-column mt-2.5'>
            <p className='block mb-2 font-medium text-gray-90'>
              Call to Action
            </p>
            <span className='flex flex-column 500:flex-row gap-5 font-medium'>
              <InputGradient
                name='buttonText'
                label='Button Name'
                maxLength={18}
                placeholder='Get It Now!'
              />
              <InputGradient
                name='buttonLink'
                label='Button Link'
                placeholder='www.example.com'
              />
            </span>
          </div>
        </div>
        <span className='row-flex items-center gap-4'>
          <Toggle />
          <p className='text-sm text-t1'>Update & Track Later.</p>
        </span>
      </div>
    </section>
  );
}

export default Coupan;

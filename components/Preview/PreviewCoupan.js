import React from 'react';
import Image from 'next/image';
import { useFormContext, useWatch } from 'react-hook-form';

const LineBreak = () => {
  return (
    <div className='inline-flex w-full'>
      <Image
        src='/assets/svgs/line_d.svg'
        width={18}
        height={18}
        className='w-full'
      />
    </div>
  );
};

function PreviewCoupon() {
  const preview = useWatch({ name: 'preview' });
  const couponTime = useWatch({ name: 'couponTime' });
  const buttonText = useWatch({ name: 'buttonText' });
  const buttonLink = useWatch({ name: 'buttonLink' });
  const salePercentage = useWatch({ name: 'salePercentage' });
  const couponNo = useWatch({ name: 'couponNo' });
  const detail = useWatch({ name: 'couponDetails' });

  console.log('PREVIEW', preview);

  const textColor = preview?.textColor;
  const bgColor = preview?.bgColor;
  const buttonColor = preview?.buttonColor;
  const percentage = salePercentage || '';
  const coverImage =
    typeof preview?.coverImage === 'string'
      ? preview?.coverImage
      : preview?.coverImage?.preview;

  const couponTimeHours = couponTime?.hours;
  const couponTimeMinutes = couponTime?.minutes;
  const couponTimeSeconds = couponTime?.seconds;
  const couponDescription =
    detail || 'Hurry it Up! Coupon Will Expire in 2 days';

  const borderStyle = {
    borderColor: textColor,
    borderWidth: '1px',
    color: textColor,
  };

  return (
    <>
      {/* <ToggleBar label="Preview" /> */}

      <div className='flex-column m-auto lg:max-w-[82%] h-full  justify-between text-white w-full rounded-[10px]'>
        <div
          style={{
            background: bgColor,
            color: textColor,
          }}
          className='bg-white h-full rounded-[12px] flex-column gap-3 items-center pb-3 text-center'
        >
          <Image
            width={100}
            height={100}
            src={coverImage || '/assets/svgs/coupan.svg'}
            className='w-full h-[20vh] object-cover rounded-t-md cursor-pointer'
            alt='video-thumbnail'
          />
          {percentage && (
            <div className='bg-t1 max-w-[80%] break-words py-[10px] rounded-md px-[20px] font-bold'>
              <p className='text-white'>{percentage}</p>
            </div>
          )}
          <div className='flex gap-4 mt-2'>
            <div
              className='flex text-center gap-3'
              style={{ color: textColor }}
            >
              <div className='space-y-2'>
                <span
                  style={borderStyle}
                  className='text-[20px] font-bold rounded-full p-[8px]'
                >
                  {couponTimeHours}
                </span>
                <p className='text-[12px]'>Hours</p>
              </div>
            </div>
            <div
              className='flex text-center gap-3'
              style={{ color: textColor }}
            >
              <div className='space-y-2'>
                <span
                  style={borderStyle}
                  className='text-[20px] font-bold rounded-full p-[8px]'
                >
                  {couponTimeMinutes}
                </span>
                <p className='text-[12px]'>Minutes</p>
              </div>
            </div>
            <div
              className='flex text-center gap-3'
              style={{ color: textColor }}
            >
              <div className='space-y-2'>
                <span
                  style={borderStyle}
                  className='text-[20px] font-bold rounded-full p-[8px]'
                >
                  {couponTimeSeconds}
                </span>
                <p className='text-[12px]'>Seconds</p>
              </div>
            </div>
          </div>

          <p
            style={{ color: textColor }}
            className='text-sm break-wordsw-[80%]'
          >
            {couponDescription}
          </p>

          <p
            style={{ color: textColor }}
            className='text-sm font-medium break-words w-[80%]'
          >
            #{couponNo}
          </p>
          <LineBreak />
          <button
            className='primary-button min-h-[50px]'
            style={{ background: buttonColor }}
            onClick={() => {
              window.open(buttonLink);
            }}
          >
            {buttonText || ''}
          </button>
        </div>
      </div>
    </>
  );
}

export default PreviewCoupon;

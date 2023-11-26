import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const LineBreak = ({ bgColor }) => (
  <div className='w-full object-fll inline-flex'>
    <svg
      width='100%'
      height='18'
      viewBox='0 0 100% 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M0.5 0V17.9727C5.23799 17.7133 9 13.7891 9 8.98635C9 4.18356 5.23799 0.259441 0.5 0Z'
        fill={bgColor}
      />
      <path
        d='M279.5 0V17.9727C274.762 17.7133 271 13.7891 271 8.98635C271 4.18356 274.762 0.259441 279.5 0Z'
        fill={bgColor}
      />
      <path
        d='M9.5 9H272'
        stroke={`url(#paint0_linear_${bgColor.replace('#', '')})`}
        strokeDasharray='2 2'
      />
      <defs>
        <linearGradient
          id={`paint0_linear_${bgColor.replace('#', '')}`}
          x1='140.75'
          y1='9'
          x2='140.75'
          y2='10'
          gradientUnits='userSpaceOnUse'
        >
          <stop offset='0' stopColor={bgColor} />
          <stop offset='1' stopColor={bgColor} />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

function PreviewCoupanData({ data }) {
  const { coupon } = data;

  const textColor = coupon?.preview?.textColor;
  const bgColor = coupon?.preview?.bgColor;
  const buttonColor = coupon?.preview?.buttonColor;
  const backGroundImage = coupon?.preview?.coverImage;
  const percentage = coupon?.salePercentage || '';
  const description = coupon?.couponDetails || '';
  const couponTime = coupon?.couponTime || {};
  const couponNo = coupon?.couponNo || '';

  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  function calculateRemainingTime() {
    if (!couponTime.hours && !couponTime.minutes && !couponTime.seconds) {
      return null;
    }

    const createdAtTimestamp = new Date(data.updatedAt).getTime();
    if (isNaN(createdAtTimestamp)) {
      // Invalid createdAt value, return null or handle the error appropriately
      return null;
    }

    const expirationTimestamp =
      createdAtTimestamp +
      couponTime.hours * 3600000 +
      couponTime.minutes * 60000 +
      couponTime.seconds * 1000;
    const currentTime = new Date().getTime();
    const remainingTimeInMillis = Math.max(
      0,
      expirationTimestamp - currentTime
    );
    return remainingTimeInMillis;
  }

  useEffect(() => {
    let timer;
    if (remainingTime !== null && remainingTime > 0) {
      timer = setTimeout(() => {
        setRemainingTime((prevRemainingTime) =>
          Math.max(0, prevRemainingTime - 1000)
        );
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [remainingTime]);

  const borderStyle = {
    borderColor: textColor,
    borderWidth: '1px',
    color: textColor,
  };

  function formatTime(time) {
    return String(time).padStart(2, '0');
  }

  function formatRemainingTime() {
    if (remainingTime === null || remainingTime <= 0) {
      return {
        hours: '00',
        minutes: '00',
        seconds: '00',
      };
    }

    const hours = Math.floor(remainingTime / 3600000);
    const minutes = Math.floor((remainingTime % 3600000) / 60000);
    const seconds = Math.floor((remainingTime % 60000) / 1000);

    return {
      hours: formatTime(hours),
      minutes: formatTime(minutes),
      seconds: formatTime(seconds),
    };
  }

  const remainingCouponTime = formatRemainingTime();
  const isTimerUp = remainingTime === null || remainingTime <= 0;

  return (
    <>
      {/* <ToggleBar label="Preview" /> */}
      <div className='flex-column w-full  h-full text-white lg:h-full lg:rounded-[10px]'>
        <div
          className='h-full relative justify-between lg:rounded-[12px] flex-column gap-3 items-center  text-center'
          style={{
            background: bgColor,
            color: textColor,
          }}
        >
          <Image
            width={100}
            height={100}
            src={backGroundImage || '/assets/svgs/coupan.svg'}
            className='w-full  min-h-[30vh] object-cover rounded-t-md cursor-pointer'
            alt='video-thumbnail'
          />

          <div className='flex-column items-center space-y-14'>
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
                <div className='space-y-8'>
                  <span
                    style={borderStyle}
                    className='text-[20px] font-bold rounded-full p-[20px]'
                  >
                    {remainingCouponTime.hours}
                  </span>
                  <p className='text-[12px]'>Hours</p>
                </div>
              </div>

              <div
                className='flex text-center  gap-3'
                style={{ color: textColor }}
              >
                <div className='space-y-8'>
                  <span
                    style={borderStyle}
                    className='text-[20px] font-bold rounded-full p-[20px]'
                  >
                    {remainingCouponTime.minutes}
                  </span>
                  <p className='text-[12px]'>Minutes</p>
                </div>
              </div>
              <div
                className='flex text-center gap-3'
                style={{ color: textColor }}
              >
                <div className='space-y-8'>
                  <span
                    style={borderStyle}
                    className='text-[20px] font-bold rounded-full p-[20px]'
                  >
                    {remainingCouponTime.seconds}
                  </span>
                  <p className='text-[12px]'>Seconds</p>
                </div>
              </div>
            </div>
            <p
              style={{ color: textColor }}
              className='text-sm  p-4 w-[50%] break-words'
            >
              {description}
            </p>
          </div>
          <div className='w-full'>
            {/* <LineBreak bgColor={buttonColor} /> */}
          </div>
          <p
            style={{ color: textColor }}
            className='text-sm font-medium break-words  w-[80%]'
          >
            #{couponNo}
          </p>

          <button
            className={`primary-button mb-3 min-h-[50px] ${
              isTimerUp && 'opacity-60'
            }`}
            style={{
              background: buttonColor,
            }}
            disabled={isTimerUp} // Disable the button when the timer is up
            onClick={() => {
              window.open(coupon?.buttonLink);
            }}
          >
            {coupon?.buttonText || ''}
          </button>
        </div>
      </div>
    </>
  );
}

export default PreviewCoupanData;

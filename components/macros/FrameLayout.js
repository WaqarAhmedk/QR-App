import { useSelector } from 'react-redux';
import React from 'react';
import { useWatch } from 'react-hook-form';

const Ribbon = ({ color }) => (
  <svg
    width='100%'
    height='101'
    viewBox='0 0 657 101'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M46 52.5L0.5 0H657L596.5 47.5L657 100.5H0.5L46 52.5Z'
      fill={color}
    />
  </svg>
);

function FrameLayout({ children }) {
  const { barCode } = useSelector((state) => state);
  const { fgColor, bgColor, qrFrame, qrTextColor, qrFrameColor } = barCode;
  const parentClass = `${qrFrame != 'frameRibbon' ? 'h-[309px]' : ''}`;
  const qrFrameButtonText = useWatch({ name: 'qrFrameButtonText' });

  return (
    <div className='w-full flex flex-col items-center '>
      <div
        className={`m-auto items-center ${parentClass}  gap-2 flex-column justify-between p-4 rounded-md`}
        style={{ background: qrFrameColor }}
      >
        {qrFrame != 'frameRibbon' && (
          <div
            className={`w-[75%] min-h-[40px]  text-2xl top-4 text-center  
        p-1 rounded-md border font-semibold border-white ${
          qrFrame === 'frameBoldText' ? `bg-white` : 'bg-transparent'
        }`}
            style={{ color: qrTextColor }}
          >
            {qrFrameButtonText}
          </div>
        )}
        {children}
      </div>
      {qrFrame === 'frameRibbon' && (
        <RibbonFrame
          fgColor={fgColor}
          qrFrameButtonText={qrFrameButtonText}
          qrFrameColor={qrFrameColor}
          qrTextColor={qrTextColor}
        />
      )}
    </div>
  );
}

export default FrameLayout;

const RibbonFrame = ({ qrFrameColor, qrFrameButtonText, qrTextColor }) => {
  return (
    <div className='w-[310px] lg:w-[340px] relative'>
      {/* <img className='-mt-3' src='/assets/svgs/ribbon.svg' /> */}
      <div className='-mt-8'>
        <Ribbon color={qrFrameColor} />
      </div>
      {/* <div class='ribbon' style={{ background: qrFrameColor }}>
        <div class='left-cut'></div>
        <p class='text-wrapper h-[50px]  items-center flex justify-center text-center w-full'>
          <span className='border w-[70%] border-white px-12 py-2 rounded-md text-white'>
            {qrFrameButtonText}
          </span>
        </p>
        <div class='right-cut'></div>
      </div> */}

      <div className='-mt-7'>
        <div
          className='bottom flex items-center'
          style={{ background: qrFrameColor, margin: 'auto', width: '84%' }}
        />
      </div>
      <span
        style={{ background: qrFrameColor, color: qrTextColor }}
        className='w-[50%]  bottom-[15px] font-medium text-lg left-[86px] border border-white  text-center py-[6px] rounded absolute'
      >
        {qrFrameButtonText}
      </span>
    </div>
  );
};

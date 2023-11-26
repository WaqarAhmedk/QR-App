import Image from 'next/image';
import React from 'react';
import Input from '../macros/Input';
import Toggle from '../macros/Toggle';

const AppDownload = () => {
  return (
    <div className='flex-column gap-5'>
      <div className='flex-column gap-5'>
        <div className='flex items-center gap-5'>
          <Image
            className='cursor-pointer'
            src='/assets/svgs/AppDownload/G_Play.svg'
            width={30}
            height={30}
            alt='Google_play'
          />
          <h3>Google Play URL</h3>
        </div>
        <div className='flex-column gap-2'>
          <label className='text-[13.3px] font-[400]'>Enter URL</label>
          <div>
            <Input placeholder='www.example.com' name='googlePlayUrl' />
          </div>
        </div>
      </div>
      <div className='flex-column gap-5'>
        <div className='flex items-center gap-5'>
          <Image
            className='cursor-pointer'
            src='/assets/svgs/AppDownload/Apple.svg'
            width={30}
            height={30}
            alt='Google_play'
          />
          <h3>Apple Store URL (ios)</h3>
        </div>
        <div className='flex-column gap-2'>
          <label className='text-[13.3px] font-[400]'>Enter URL</label>
          <div>
            <Input placeholder='www.example.com' name='appStoreUrl' />
          </div>
        </div>
      </div>
      <span className='row-flex items-center gap-4'>
        <Toggle name='updateAndTrack' />
        <p className='text-sm text-t1'>Update & Track Later.</p>
      </span>
    </div>
  );
};

export default AppDownload;

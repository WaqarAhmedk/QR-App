import Image from 'next/image';
import React from 'react';
import Input from '../macros/Input';
import Toggle from '../macros/Toggle';
import LocationPicker from '../Location';

const Location = () => {
  return (
    <div className='flex-column gap-5'>
      <div className='flex-column gap-5'>
        <Input
          inputLabel='Google Map Url'
          name='mapUrl'
          placeholder='https://www.google.com/maps/@33.619968,73.039872,12z'
        />
        <span className='row-flex items-center gap-4'>
          <Toggle name='updateAndTrack' />
          <p className='text-sm text-t1'>Update & Track Later.</p>
        </span>
      </div>
      <h3>OR</h3>
      <div className='flex items-center gap-2 text-primary cursor-pointer'>
        <Image
          className='cursor-pointer'
          src='/assets/svgs/location.svg'
          width={13}
          height={13}
          alt='Google_play'
        />
        <p className='text-[13px]'>Search on Google Map</p>
      </div>
      <LocationPicker />
    </div>
  );
};

export default Location;

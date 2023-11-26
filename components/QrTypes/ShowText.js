import React from 'react';
import Input from '../macros/Input';
import Textarea from '../macros/TextArea';
import Toggle from '../macros/Toggle';

const ShowText = () => {
  return (
    <div className='flex-column gap-5'>
      <div className='flex-column gap-5 '>
        <p className='font-medium'>Text</p>
        <Textarea
          name='text'
          placeholder='Please write some text to generate QR'
        />
      </div>
      <span className='row-flex items-center gap-4'>
        <Toggle name='updateAndTrack' />
        <p className='text-sm text-t1'>Update & Track Later.</p>
      </span>
    </div>
  );
};

export default ShowText;

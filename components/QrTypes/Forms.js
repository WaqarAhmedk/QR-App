import Image from 'next/image';
import React from 'react';
import Input from '../macros/Input';
import Toggle from '../macros/Toggle';

const Forms = () => {
  return (
    <div className='flex-column gap-5'>
      <div className='flex-column gap-5'>
        <Input
          inputLabel='Form URL'
          name='url'
          placeholder='https://www.google.com/maps/@33.619968,73.039872,12z'
        />
        <span className='row-flex items-center gap-4'>
          <Toggle />
          <p className='text-sm text-t1'>Update & Track Later.</p>
        </span>
      </div>
    </div>
  );
};

export default Forms;

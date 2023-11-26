import React from 'react';
import Input from '../macros/Input';
import Textarea from '../macros/TextArea';
import Toggle from '../macros/Toggle';

const MakeCall = () => {
  return (
    <div className='flex-column gap-5'>
      <Input
        name='phone'
        placeholder='+61 1234567890'
        inputLabel='Mobile Number'
      />

      <span className='row-flex items-center gap-4'>
        <Toggle />
        <p className='text-sm text-t1'>Update & Track Later.</p>
      </span>
    </div>
  );
};

export default MakeCall;

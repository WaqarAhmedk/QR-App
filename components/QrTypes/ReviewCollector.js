import React from 'react';
import Input from '../macros/Input';
import ToggleBar from '../macros/ToggleBar';
import Toggle from '../macros/Toggle';
function ReviewCollector() {
  return (
    <div className='flex-column gap-6'>
      <Input
        placeholder='example (https://www.google.com)'
        inputLabel='Enter Link To Collect Review'
        classNames='h-[45px]'
        name='url'
      />
      <span className='row-flex items-center gap-4'>
        <Toggle />
        <p className='text-sm text-t1'>Update & Track Later.</p>
      </span>
    </div>
  );
}

export default ReviewCollector;

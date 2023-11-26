import React from 'react';
import Input from '../macros/Input';
import Textarea from '../macros/TextArea';
import Toggle from '../macros/Toggle';

const SendEmail = () => {
  return (
    <div className='flex-column gap-7'>
      <div className='flex-column gap-3'>
        <Input name='email' placeholder='Enter Email' inputLabel='Email ID:' />
        <Input
          name='subject'
          placeholder='Enter Email Subject '
          inputLabel='Subject:'
        />
        <Textarea
          name='message'
          placeholder='Your Message'
          inputLabel='Message'
        />
      </div>
      <span className='row-flex items-center gap-4'>
        <Toggle />
        <p className='text-sm text-t1'>Update & Track Later.</p>
      </span>
    </div>
  );
};

export default SendEmail;

import React from 'react';
import InputUpload from '../macros/InputUpload';
import Input from '../macros/Input';
import { useFormContext } from 'react-hook-form';
import Toggle from '../macros/Toggle';
import InputColor from '../macros/inputColor';

const UploadImage = () => {
  const { formState } = useFormContext();
  const errors = formState.errors;
  return (
    <div className='flex-column gap-3'>
      <Input
        placeholder='Gallery Name'
        inputLabel='Gallery Name'
        classNames='h-[45px]'
        name='galleryName'
      />
      <InputColor
        name='backgroundColor'
        inputLabel='Background color'
        defaultColor='#ffffff'
        classNames='w-[25%]'
      />
      <InputUpload
        text='Upload Photo'
        label='Images'
        type='uploadImage'
        name='files'
        maxFiles={10}
        fileType={{
          'image/png': ['.png'],
          'image/jpeg': ['.jpeg', '.jpg'],
        }}
        description='10 Photos Max'
      />
      {errors?.files && (
        <p className='text-primary text-xs'>Please Select at least one file.</p>
      )}
      <span className='row-flex items-center gap-4'>
        <Toggle name='updateAndTrack' />
        <p className='text-sm text-t1'>Update & Track Later.</p>
      </span>
    </div>
  );
};

export default UploadImage;

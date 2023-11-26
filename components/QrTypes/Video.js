import React from 'react';
import PremiumText from '../macros/PremiumText';
import InputColor from '../macros/inputColor';
import ColorPallete from '../ColorPallete';
import { VIDEO_PALLETE } from '@/utils/mock';
import Input from '../macros/Input';
import Textarea from '../macros/TextArea';
import Toggle from '../macros/Toggle';
import { useFormContext } from 'react-hook-form';

function Video() {
  const { setValue } = useFormContext();
  const handlePalleteChange = (pallete) => {
    setValue('preview.backGroundColor', pallete.backGroundColor);
    setValue('preview.buttonColor', pallete.iconsColor);
    setValue('preview.textColor', pallete.textColor);
  };
  return (
    <>
      <div className='row-flex gap-[10px] items-center'>
        <PremiumText text='Design' />
      </div>
      <div className='flex-column break-words gap-6'>
        <ColorPallete
          pallete={VIDEO_PALLETE}
          palleteClass='color-palette-flex'
          onChange={handlePalleteChange}
        />
        <div className='input-color-wrapper'>
          <InputColor
            classNames='gap-5'
            inputLabel='Background Color'
            name='preview.backGroundColor'
            defaultColor='#5E61F6'
          />
          <InputColor
            classNames='gap-5'
            inputLabel='Button Color'
            name='preview.buttonColor'
            defaultColor='#ffffff'
          />
          <InputColor
            classNames='gap-5'
            inputLabel='Text Color'
            defaultColor='#ffffff'
            name='preview.textColor'
          />
        </div>
        <Input
          name='videoTitle'
          inputLabel='Video Title'
          placeholder='Video Title (e.g)'
        />
        <Textarea
          name='description'
          inputLabel='Description'
          inputClass='h-[70px]'
        />
        <Input
          name='videoUrl'
          inputLabel='Video URL'
          placeholder='Paste a video link'
        />
        <span className='row-flex items-center gap-4'>
          <Toggle />
          <p className='text-sm text-t1'>Update & Track Later.</p>
        </span>
      </div>
    </>
  );
}

export default Video;

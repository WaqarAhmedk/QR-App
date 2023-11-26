import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { BarCodeContext } from '@/context/BarCodeContext';
import { useFormContext } from 'react-hook-form';
import { isObject } from '@/utils/functions';

//--- default disabled, enabled only where it requireds
function InputColor({ inputLabel, classNames, name, onChange, enabled }) {
  const { register, watch } = useFormContext();
  const [watchedValue, setWatchedValue] = useState();

  useEffect(() => {
    //--- first check the watch returning the string if yes so then
    //--- set this to the state other wise set as dummy string value
    const value = watch(name);
    if (typeof value === 'string') {
      setWatchedValue(value);
    } else {
      setWatchedValue('#ffffff');
    }
  }, [watch(name)]);

  const onColorChange = (e) => onChange(e.target.value);
  return (
    <div className={`flex flex-col gap-1 ${classNames}`}>
      <span className='text-sm text-t1'>{inputLabel}</span>
      <div
        className='flex items-center min-h-[30px]
        border-[1px] px-2
        rounded-full gradient-border'
      >
        <input
          type='color'
          // disabled={enabled ? false : true}
          onChange={onColorChange}
          className='input-color antialised'
          {...(name ? register(name) : {})}
        />
        <span className='text-sm md:text-base'>{watchedValue}</span>
      </div>
    </div>
  );
}

export default InputColor;

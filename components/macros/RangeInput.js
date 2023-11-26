import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';

function RangeInput({ label, name, onChange }) {
  const barCode = useSelector((state) => state.barCode);
  const [range, setRange] = useState(barCode.logoSize || 0.5);
  const { setValue } = useFormContext();

  const handleChange = (e) => {
    setValue(name, Number(e.target.value));
    setRange(e.target.value);
    onChange && onChange(e);
  };

  return (
    <>
      <label
        htmlFor='steps-range'
        className='block mb-2 breif font-semibold 1320:text-base text-gray-900'
      >
        {label}
      </label>
      <div className='flex items-center gap-5'>
        <input
          id='steps-range'
          type='range'
          min='0.2'
          max='0.7'
          onChange={handleChange}
          value={range}
          step='0.1'
          className='w-full h-2 rounded-lg appearance-none cursor-pointer 
        bg-secondary opacity-2'
        />
        <p className='breif text-primary font-[400] antialiased cursor-pointer'>
          Reset
        </p>
      </div>
    </>
  );
}

export default RangeInput;

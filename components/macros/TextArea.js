import React from 'react';
import { useFormContext } from 'react-hook-form';

const Textarea = (props) => {
  const {
    inputLabel,
    name,
    placeholder,
    className,
    bg,
    inputClass,
    maxLength,
  } = props;

  const {
    register,
    formState: { errors },
  } = useFormContext();
  const hasError = errors[name] !== undefined;
  return (
    <div className={`w-full ${className}`}>
      {inputLabel && (
        <label className='block mb-2 font-medium text-gray-90'>
          {inputLabel}
        </label>
      )}
      <div className='relative'>
        <textarea
          className={`${
            bg === 'light' ? '#ffffff' : 'bg-light'
          } block w-full h-20 py-2 pl-4 px-3  placeholder-gray border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent ${inputClass}`}
          placeholder={placeholder}
          name={name}
          {...(name ? register(name) : {})}
          maxLength={maxLength}
        />
        {hasError && (
          <span className='text-primary text-xs'>{errors[name].message}</span>
        )}
      </div>
    </div>
  );
};

export default Textarea;

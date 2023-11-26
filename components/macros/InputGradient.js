import React from 'react'
import { useFormContext } from 'react-hook-form'

function InputGradient({ label, placeholder, name, maxLength }) {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const hasError = errors[name] !== undefined
  return (
    <span className="center-input w-full">
      <p className="block text-sm lg:text-[13.3px] mb-2.5 text-t1 antialiased">
        {label}
      </p>
      <input
        maxLength={maxLength}
        className="gradient-border ] text-primary py-3 w-full rounded-[9px] font-semibold placeholder:text-gray-500" 
        placeholder={placeholder}
        {...(name ? register(name) : {})}
      />
      {hasError && (
        <span className="text-[red] text-xs">{errors[name].message}</span>
      )}
    </span>
  )
}

export default InputGradient

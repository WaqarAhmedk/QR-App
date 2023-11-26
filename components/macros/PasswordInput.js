import React, { useState } from "react";
import { Controller } from "react-hook-form";
import Image from "next/image";

const PasswordInput = ({ inputLabel, placeholder, name, control, errors }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const eyeIcon = "absolute right-3 h-6 w-6 text-gray-500 cursor-pointer";

  const hasError = errors[name] !== undefined;
  return (
    <div className="flex flex-col gap-2">
      {inputLabel && <span className="input-label">{inputLabel}</span>}
      <div className="relative flex items-center">
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <input
              type={showPassword ? "text" : "password"}
              placeholder={placeholder}
              className="input"
              {...field}
            />
          )}
        />
        {showPassword ? (
          <Image
            src="/assets/svgs/Authentication/eyeOff.svg"
            width={100}
            height={100}
            unoptimized
            className={eyeIcon}
            onClick={togglePasswordVisibility}
          />
        ) : (
          <Image
            src="/assets/svgs/Authentication/eye.svg"
            width={100}
            height={100}
            unoptimized
            className={eyeIcon}
            onClick={togglePasswordVisibility}
          />
        )}
      </div>
      {hasError && (
        <span className="text-primary text-xs">{errors[name].message}</span>
      )}
    </div>
  );
};

export default PasswordInput;

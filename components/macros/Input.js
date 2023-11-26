import React from "react";
import PremiumText from "./PremiumText";
import { useFormContext } from "react-hook-form";

const Input = (props) => {
  const {
    register,
    formState: { errors, dirtyFields },
  } = useFormContext();

  const {
    inputLabel,
    placeholder,
    name,
    classNames,
    width,
    type = "text",
    bg,
    index,
    maxLength,
    premium = false,
    required,
  } = props;

  function getPropertyFromError(path, value) {
    const properties = path.split("."); // Split the path by '.'
    for (let property of properties) {
      if (property.includes("[") && property.includes("]")) {
        // Handle array index
        const arrayProp = property.slice(0, property.indexOf("["));
        const index = Number(
          property.slice(property.indexOf("[") + 1, property.indexOf("]"))
        );
        if (
          !value[arrayProp] ||
          !Array.isArray(value[arrayProp]) ||
          index >= value[arrayProp].length
        ) {
          return undefined;
        }
        value = value[arrayProp][index];
      } else {
        // Handle object property
        if (!value || typeof value !== "object" || !(property in value)) {
          return undefined;
        }
        value = value[property];
      }

      if (value === undefined) {
        return undefined;
      }
    }

    return value;
  }

  return (
    <div className={`w-full ${width}`}>
      {premium && inputLabel ? (
        <div className="input-label">
          <PremiumText text={inputLabel} />
        </div>
      ) : inputLabel && !required ? (
        <span className="input-label">{inputLabel}</span>
      ) : (
        inputLabel &&
        required && (
          <div className="input-label flex">
            {inputLabel} <p className="text-[red]">*</p>
          </div>
        )
      )}
      <div className="relative">
        <input
          type={type}
          name={name}
          maxLength={maxLength}
          placeholder={placeholder}
          className={`${
            (classNames, bg === "light" ? "#ffffff" : "bg-light", "input")
          }`}
          {...(name ? register(name) : {})}
        />
        {true && (
          <span className="text-primary text-xs">
            {getPropertyFromError(name, errors)?.message}
          </span>
        )}
      </div>
    </div>
  );
};
export default Input;

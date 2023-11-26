import React, { useRef, useState } from "react";
import Image from "next/image";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useFormContext, useWatch } from "react-hook-form";

const listClass = `cursor-pointer text-left pl-4 text-t1 py-1 rounded-[3px] hover:text-primary hover:font-semibold`;

const TypeDropDown = ({ title, label, listItems, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const { control } = useFormContext();
  const { couponTime } = useWatch(control, {
    name: "couponTime",
  });
  const { setValue } = useFormContext();
  const dropDownRef = useRef();
  useOnClickOutside(dropDownRef, () => setIsOpen(false));

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value) => {
    setValue(name, value);
    setSelected(value);
    setIsOpen(false);
  };

  return (
    <div className="relative width flex-column gap-2" ref={dropDownRef}>
      {label && (
        <p className="block text-sm lg:text-base mb-2 font-medium text-gray-90">
          {label}
        </p>
      )}
      <button
        name="drop-down"
        className="bg-light text-t1 gap-6 px-4 w-full py-4 rounded-xl flex items-center whitespace-nowrap justify-between border border-grey"
        onClick={toggleDropdown}
        type="button"
      >
        <span>
          {name === "couponTime.hours"
            ? couponTime?.hours
            : name === "couponTime.minutes"
            ? couponTime?.minutes
            : name === "couponTime.seconds"
            ? couponTime?.seconds
            : title}
        </span>
        <Image
          src="/assets/svgs/icons/arrow_down_2.svg"
          width={15}
          height={9}
        />
      </button>
      {isOpen && listItems.length > 0 && (
        <ul className="absolute z-50 max-h-[150px] overflow-auto flex-column w-full py-1 top-[65px] left-0 bg-light border border-grey rounded-xl">
          {listItems.map(({ label }, index) => {
            return (
              <li
                key={index * Math.random()}
                onClick={() => handleSelect(label)}
                className={`${listClass}`}
                style={{
                  color: `${selected === label ? "#5E61F6" : ""} `,
                  fontWeight: `${selected === label ? 600 : ""} `,
                }}
              >
                {label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TypeDropDown;

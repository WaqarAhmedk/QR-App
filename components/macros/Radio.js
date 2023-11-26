import React from "react";

function CheckBox({
  inputLabel,
  placeholder,
  onChange,
  classNames,
  defaultvalue,
}) {
  return (
    <div className="flex items-center gap-2">
      {defaultvalue ? (
        <input
          onChange={onChange}
          type="checkbox"
          checked
          className={`w-5 h-5 rounded-[5px] border border-grey-500`}
        />
      ) : (
        <input
          onChange={onChange}
          type="checkbox"
          className={`w-5 h-5 rounded-[5px] border border-grey-500`}
        />
      )}
      <label
        className={`text-sm antialiased text-t1 font-medium text-gray-90 ${classNames}`}
      >
        {inputLabel}
      </label>
    </div>
  );
}

export default CheckBox;
